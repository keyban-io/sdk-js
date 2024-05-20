use axum::routing::get;
use axum::{http::StatusCode, Router};

async fn health() -> Result<String, StatusCode> {
    Ok("Ok!".to_string())
}

fn app() -> Router {
    Router::new().route("/health", get(health))
}

#[tokio::main]
async fn main() {
    let listener = tokio::net::TcpListener::bind("0.0.0.0:9000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app()).await.unwrap();
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::body::Body;
    use axum::http::Request;
    use http_body_util::BodyExt; // for `collect`
    use tower::ServiceExt; // for `call`, `oneshot`, and `ready`

    #[tokio::test]
    async fn test_health() {
        let response = health().await.unwrap();
        assert_eq!(response, "Ok!".to_string());
    }

    #[tokio::test]
    async fn test_health_route() {
        let app = app();
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
