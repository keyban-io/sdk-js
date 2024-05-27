use crate::dkg;
use axum::{
    http::{self},
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
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
