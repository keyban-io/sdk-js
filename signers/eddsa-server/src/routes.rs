use std::{collections::HashMap, sync::Arc};

use crate::dkg;
use axum::{
    extract::{Path, State},
    http, Json,
};
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;

////////////////////////////////////////////////////////////////////////////////////////////////////
///                                      Response Models                                         ///
////////////////////////////////////////////////////////////////////////////////////////////////////
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DkgRound1Response {
    server_round1_package: dkg::ServerRound1Package,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DkgRound2Response {
    public_key: String,
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
) -> Result<Json<DkgRound1Response>, http::StatusCode> {
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
    Ok(Json(DkgRound1Response {
        server_round1_package,
    }))
}

pub async fn dkg_round2(
    Path(keyid): Path<String>,
    State(state): State<TssState>,
    Json(client_round2_package): Json<dkg::ClientRound2Package>,
) -> Result<Json<DkgRound2Response>, http::StatusCode> {
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
    Ok(Json(DkgRound2Response { public_key }))
}
