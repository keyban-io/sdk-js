use std::{collections::HashMap, sync::Arc};

use crate::dkg;
use axum::{
    extract::{Path, State},
    http::{self},
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;

////////////////////////////////////////////////////////////////////////////////////////////////////
///                                      Response Models                                         ///
////////////////////////////////////////////////////////////////////////////////////////////////////
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DkgRound1Response {
    pub server_round1_package: dkg::ServerRound1Package,
}

impl IntoResponse for DkgRound1Response {
    fn into_response(self) -> Response {
        let body = Json(self);
        let status = http::StatusCode::CREATED;
        (status, body).into_response()
    }
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DkgRound2Response {
    pub public_key: String,
}

impl IntoResponse for DkgRound2Response {
    fn into_response(self) -> Response {
        let body = Json(self);
        let status = http::StatusCode::CREATED;
        (status, body).into_response()
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          Tss State                                             //
////////////////////////////////////////////////////////////////////////////////////////////////////
#[derive(Clone)]
struct DkgState {
    secret_package: dkg::ServerRound1SecretPackage,
    client_round1_package: dkg::ClientRound1Package,
}

#[derive(Clone)]
struct KeyStoreState {
    key_package: dkg::KeyPackage,
    pubkey_package: dkg::PublicKeyPackage,
}

#[derive(Clone)]
pub struct TssState {
    dkg: Arc<RwLock<HashMap<String, DkgState>>>,
    keystore: Arc<RwLock<HashMap<String, KeyStoreState>>>,
}

impl Default for TssState {
    fn default() -> Self {
        Self {
            dkg: Arc::new(RwLock::new(HashMap::new())),
            keystore: Arc::new(RwLock::new(HashMap::new())),
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Routes                                             //
////////////////////////////////////////////////////////////////////////////////////////////////////

pub async fn health() -> Result<String, http::StatusCode> {
    Ok("Ok!".to_string())
}

pub async fn dkg_round1(
    Path(keyid): Path<String>,
    State(state): State<TssState>,
    Json(client_round1_package): Json<dkg::ClientRound1Package>,
) -> Result<DkgRound1Response, http::StatusCode> {
    let (secret_package, server_round1_package) =
        match dkg::server_dkg_round_1(client_round1_package.clone()) {
            Ok((secret_package, server_round1_package)) => (secret_package, server_round1_package),
            Err(_) => return Err(http::StatusCode::INTERNAL_SERVER_ERROR),
        };
    // store round1 outcomes in memory
    state.dkg.write().await.insert(
        keyid,
        DkgState {
            secret_package,
            client_round1_package,
        },
    );
    Ok(DkgRound1Response {
        server_round1_package,
    })
}

pub async fn dkg_round2(
    Path(keyid): Path<String>,
    State(state): State<TssState>,
    Json(client_round2_package): Json<dkg::ClientRound2Package>,
) -> Result<DkgRound2Response, http::StatusCode> {
    let dkg_state = state.dkg.write().await.remove(&keyid);
    let dkg_state = match dkg_state {
        Some(dkg_state) => dkg_state,
        None => return Err(http::StatusCode::NOT_FOUND),
    };
    let (key_package, pubkey_package) = match dkg::server_dkg_round_2(
        dkg_state.secret_package,
        dkg_state.client_round1_package,
        client_round2_package,
    ) {
        Ok((key_package, pubkey_package)) => (key_package, pubkey_package),
        Err(_) => return Err(http::StatusCode::INTERNAL_SERVER_ERROR),
    };
    // store round1 outcomes in memory
    let public_key = hex::encode(pubkey_package.verifying_key().serialize());
    state.keystore.write().await.insert(
        keyid,
        KeyStoreState {
            key_package,
            pubkey_package,
        },
    );
    Ok(DkgRound2Response { public_key })
}

mod tests {
    use crate::dkg;

    use super::*;

    #[tokio::test]
    async fn health_handler_returns_ok() {
        let response = health().await.unwrap();
        assert_eq!(response, "Ok!".to_string());
    }

    #[tokio::test]
    async fn dkg_handlers_save_intermidiate_packages_in_state_successfully() {
        // Round 1
        let (client_round1_secret_package, client_round1_package) =
            dkg::client_dkg_round_1().unwrap();
        let state = TssState::default();
        let response: DkgRound1Response = dkg_round1(
            Path("toto".to_string()),
            State(state.clone()),
            Json(client_round1_package),
        )
        .await
        .unwrap();
        let server_round1_package = response.server_round1_package;
        // Round 2
        let (_, client_pub_key_package, client_round2_package) =
            dkg::client_dkg_round_2(client_round1_secret_package, server_round1_package).unwrap();
        let client_pubkey = hex::encode(client_pub_key_package.verifying_key().serialize());

        let response: DkgRound2Response = dkg_round2(
            Path("toto".to_string()),
            State(state),
            Json(client_round2_package),
        )
        .await
        .unwrap();
        let server_pubkey = response.public_key;

        assert_eq!(client_pubkey, server_pubkey);
    }
}
