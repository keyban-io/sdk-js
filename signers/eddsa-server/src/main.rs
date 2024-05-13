use axum::{Router, http::StatusCode};
use axum::routing::{get};


async fn health() -> Result<String, StatusCode> {
  Ok("Ok!".to_string())
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/health", get(health));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:9000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}