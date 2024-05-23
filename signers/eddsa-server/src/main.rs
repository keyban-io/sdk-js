mod dkg;
mod routes;

use axum;
use axum::{routing, Router};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

fn app(state: routes::TssState) -> Router {
    Router::new()
        .route("/health", routing::get(routes::health))
        .route("/dkg/round1/:keyid", routing::post(routes::dkg_round1))
        .route("/dkg/round2/:keyid", routing::post(routes::dkg_round2))
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}

#[tokio::main]
async fn main() {
    let state = routes::TssState::default();
    let listener = tokio::net::TcpListener::bind("0.0.0.0:9000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app(state)).await.unwrap();
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::body::Body;
    use axum::http::{Request, StatusCode};
    use http_body_util::BodyExt; // for `collect`
    use tower::ServiceExt; // for `call`, `oneshot`, and `ready`

    #[tokio::test]
    async fn test_health() {
        let response = routes::health().await.unwrap();
        assert_eq!(response, "Ok!".to_string());
    }

    #[tokio::test]
    async fn test_health_route() {
        let state = routes::TssState::default();
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
}
