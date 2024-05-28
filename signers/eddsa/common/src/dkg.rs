use frost_ed25519 as frost;
use maplit::btreemap;
use rand::thread_rng;
use serde::{Deserialize, Serialize};

const MAX_SIGNERS: u16 = 2;
const MIN_SIGNERS: u16 = 2;
const CLIENT_ID: u16 = 1;
const SERVER_ID: u16 = 2;

pub fn client_id() -> frost::Identifier {
    CLIENT_ID.try_into().unwrap()
}

pub fn server_id() -> frost::Identifier {
    SERVER_ID.try_into().unwrap()
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ServerRound1Package {
    part1_package: frost::keys::dkg::round1::Package,
    part2_package: frost::keys::dkg::round2::Package,
}

pub type ClientRound1Package = frost::keys::dkg::round1::Package;
pub type ClientRound2Package = frost::keys::dkg::round2::Package;
pub type ServerRound1SecretPackage = frost::keys::dkg::round2::SecretPackage;
pub type ClientRound1SecretPackage = frost::keys::dkg::round1::SecretPackage;
pub type SecretKeyPackage = frost::keys::KeyPackage;
pub type PublicKeyPackage = frost::keys::PublicKeyPackage;
pub struct KeyPair {
    pub secret_key: SecretKeyPackage,
    pub public_key: PublicKeyPackage,
}

pub fn client_dkg_round_1() -> Result<(ClientRound1SecretPackage, ClientRound1Package), frost::Error>
{
    let mut rng = thread_rng();

    frost::keys::dkg::part1(client_id(), MAX_SIGNERS, MIN_SIGNERS, &mut rng)
}

pub fn server_dkg_round_1(
    client_round1_package: ClientRound1Package,
) -> Result<(ServerRound1SecretPackage, ServerRound1Package), frost::Error> {
    let mut rng = thread_rng();
    let (secret_package, part1_package) =
        frost::keys::dkg::part1(server_id(), MAX_SIGNERS, MIN_SIGNERS, &mut rng)?;

    let client_part1_package = btreemap! {client_id() => client_round1_package};

    let (secret_package, part2_server_package) =
        frost::keys::dkg::part2(secret_package, &client_part1_package)?;
    Ok((
        secret_package,
        ServerRound1Package {
            part1_package,
            part2_package: part2_server_package.get(&client_id()).unwrap().clone(), // It's safe to unwrap here because we know the client_id is in the map, otherwise the function would have returned an error
        },
    ))
}

pub fn client_dkg_round_2(
    round1_secret_package: ClientRound1SecretPackage,
    server_round1_package: ServerRound1Package,
) -> Result<(KeyPair, ClientRound2Package), frost::Error> {
    let server_part1_package = btreemap! {server_id() => server_round1_package.part1_package};
    let server_part2_package = btreemap! {server_id() => server_round1_package.part2_package};
    let (secret_package, part2_package) =
        frost::keys::dkg::part2(round1_secret_package, &server_part1_package)?;
    let (key_package, pub_key_package) = frost::keys::dkg::part3(
        &secret_package,
        &server_part1_package,
        &server_part2_package,
    )?;
    Ok((
        KeyPair {
            secret_key: key_package,
            public_key: pub_key_package,
        },
        part2_package.get(&server_id()).unwrap().clone(), // It's safe to unwrap here because we know the server_id is in the map, otherwise the function would have returned an error
    ))
}

pub fn server_dkg_round_2(
    round1_secret_package: ServerRound1SecretPackage,
    client_round1_package: ClientRound1Package,
    client_round2_package: ClientRound2Package,
) -> Result<KeyPair, frost::Error> {
    let client_part1_package = btreemap! {client_id() => client_round1_package};
    let client_part2_package = btreemap! {client_id() => client_round2_package};
    let (key_package, pubkey_package) = frost::keys::dkg::part3(
        &round1_secret_package,
        &client_part1_package,
        &client_part2_package,
    )?;
    Ok(KeyPair {
        secret_key: key_package,
        public_key: pubkey_package,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dkg_lib_generates_valid_key_shares() {
        // round 1 client: client executing dkg part 1
        let (client_round1_secret_package, client_round1_package) = client_dkg_round_1().unwrap();

        // round 1 server: server executing dkg part 1 and part 2
        let (server_round1_secret_package, server_package) =
            server_dkg_round_1(client_round1_package.clone()).unwrap();

        // round 2 client: client executing dkg part 2 and part 3
        let (client_keypair, client_round2_package) =
            client_dkg_round_2(client_round1_secret_package, server_package).unwrap();

        // round 2 server: server executing dkg part 3
        let server_keypair = server_dkg_round_2(
            server_round1_secret_package,
            client_round1_package,
            client_round2_package,
        )
        .unwrap();

        assert_ne!(client_keypair.secret_key, server_keypair.secret_key);
        assert_eq!(client_keypair.public_key, server_keypair.public_key);
    }
}
