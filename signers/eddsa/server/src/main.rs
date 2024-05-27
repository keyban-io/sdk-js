mod handlers;
mod routes;

use axum;

#[tokio::main]
async fn main() {
    let state = handlers::TssState::default();
    let listener = tokio::net::TcpListener::bind("0.0.0.0:9000").await.unwrap();
    println!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, routes::app(state)).await.unwrap();
}
