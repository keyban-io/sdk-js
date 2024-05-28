use eddsa_common::{dkg, models};
use reqwest;
use std::{env, process};

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().collect();

    let (query, keyid) = parse_config(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    match query {
        "dkg" => dkg(keyid).await.unwrap_or_else(|err| {
            eprintln!("Problem running DKG: {err}");
            process::exit(1);
        }),
        _ => eprintln!("Invalid query"),
    }
}

fn parse_config(args: &[String]) -> Result<(&str, &str), &'static str> {
    if args.len() < 3 {
        return Err("not enough arguments");
    }
    let query = &args[1];
    let keyid = &args[2];
    Ok((query, keyid))
}

async fn dkg(keyid: &str) -> Result<(), String> {
    println!("Running DKG for {}", keyid);

    let http_client = reqwest::Client::new();
    // Round 1
    let (client_round1_secret_package, client_round1_package) = match dkg::client_dkg_round_1() {
        Ok((client_round1_secret_package, client_round1_package)) => {
            (client_round1_secret_package, client_round1_package)
        }
        Err(_) => return Err(String::from("Error in client_dkg_round_1")),
    };
    // call server round 1
    let response = http_client
        .post(&format!("http://localhost:9000/dkg/round1/{}", keyid))
        .header("Content-Type", "application/json")
        .json(&client_round1_package)
        .send()
        .await;

    let response = match response {
        Ok(response) => response,
        Err(e) => {
            return Err(format!(
                "Error in server POST request to /dkg/round1: {}",
                e
            ))
        }
    };
    if response.status() != reqwest::StatusCode::CREATED {
        return Err(format!(
            "Server returned status code: {}",
            response.status()
        ));
    }
    let response: models::DkgRound1Response = match response.json().await {
        Ok(response) => response,
        Err(e) => return Err(format!("Error in server response JSON parsing: {}", e)),
    };

    let server_round1_package = response.server_round1_package;

    // Round 2
    // TODO store the secret share somewhere
    let (client_keypair, client_round2_package) =
        dkg::client_dkg_round_2(client_round1_secret_package, server_round1_package).unwrap();
    let client_pubkey = hex::encode(client_keypair.public_key.verifying_key().serialize());

    // call server round 2
    let response = http_client
        .post(&format!("http://localhost:9000/dkg/round2/{}", keyid))
        .header("Content-Type", "application/json")
        .json(&client_round2_package)
        .send()
        .await;

    let response = match response {
        Ok(response) => response,
        Err(e) => {
            return Err(format!(
                "Error in server POST request to /dkg/round1: {}",
                e
            ))
        }
    };
    if response.status() != reqwest::StatusCode::CREATED {
        return Err(format!(
            "Server returned status code: {}",
            response.status()
        ));
    }
    let response: models::DkgRound2Response = match response.json().await {
        Ok(response) => response,
        Err(e) => return Err(format!("Error in server response JSON parsing: {}", e)),
    };

    let server_pubkey = response.public_key;
    println!("Client public key: {}", client_pubkey);
    println!("Server public key: {}", server_pubkey);
    if client_pubkey != server_pubkey {
        return Err(String::from("Client and server public keys do not match"));
    }

    println!("DKG completed successfully!");
    Ok(())
}
