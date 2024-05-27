use axum;
use axum::{routing, Router};

use crate::handlers;

pub fn app(state: handlers::TssState) -> Router {
    Router::new()
        .route("/health", routing::get(handlers::health))
        .route("/dkg/round1/:keyid", routing::post(handlers::dkg_round1))
        .route("/dkg/round2/:keyid", routing::post(handlers::dkg_round2))
        .with_state(state)
}

#[cfg(test)]
mod tests {

    use super::*;
    use axum::body::Body;
    use axum::http::{Request, StatusCode};
    use eddsa_common::{dkg, models};
    use http_body_util::BodyExt; // for `collect`
    use tower::ServiceExt; // for `call`, `oneshot`, and `ready`

    #[tokio::test]
    async fn health_endpoint_returns_200() {
        let state = handlers::TssState::default();
        let app = app(state);
        let response = app
            .oneshot(
                Request::builder()
                    .uri("/health")
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        let body = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(&body[..], b"Ok!");
    }

    #[tokio::test]
    async fn dkg_endpoints_generate_valid_key_shares_and_return_201() {
        let state = handlers::TssState::default();
        let app = app(state);
        // Round 1
        let (client_round1_secret_package, client_round1_package) =
            dkg::client_dkg_round_1().unwrap();

        let response = app
            .clone()
            .oneshot(
                Request::builder()
                    .uri("/dkg/round1/toto")
                    .method("POST")
                    .header("Content-Type", "application/json")
                    .body(Body::from(
                        serde_json::to_string(&client_round1_package).unwrap(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::CREATED);
        let response: models::DkgRound1Response =
            serde_json::from_slice(&response.into_body().collect().await.unwrap().to_bytes())
                .unwrap();
        let server_round1_package = response.server_round1_package;

        // Round 2
        let (_, client_pub_key_package, client_round2_package) =
            dkg::client_dkg_round_2(client_round1_secret_package, server_round1_package).unwrap();
        let client_pubkey = hex::encode(client_pub_key_package.verifying_key().serialize());

        let response = app
            .oneshot(
                Request::builder()
                    .uri("/dkg/round2/toto")
                    .method("POST")
                    .header("Content-Type", "application/json")
                    .body(Body::from(
                        serde_json::to_string(&client_round2_package).unwrap(),
                    ))
                    .unwrap(),
            )
            .await
            .unwrap();
        assert_eq!(response.status(), StatusCode::CREATED);
        let response: models::DkgRound2Response =
            serde_json::from_slice(&response.into_body().collect().await.unwrap().to_bytes())
                .unwrap();
        let server_pubkey = response.public_key;

        assert_eq!(client_pubkey, server_pubkey);
    }
}
