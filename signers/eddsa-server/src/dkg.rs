use frost_ed25519::{
    keys::{
        dkg::{self, round1 as part1, round2 as part2},
        KeyPackage, PublicKeyPackage,
    },
    Identifier,
};
use maplit::btreemap;
use rand::thread_rng;

const MAX_SIGNERS: u16 = 2;
const MIN_SIGNERS: u16 = 2;
const CLIENT_ID: u16 = 1;
const SERVER_ID: u16 = 2;

fn client_id() -> Identifier {
    CLIENT_ID.try_into().unwrap()
}

fn server_id() -> Identifier {
    SERVER_ID.try_into().unwrap()
}

pub fn client_dkg_round_1() -> (part1::SecretPackage, part1::Package) {
    let mut rng = thread_rng();

    dkg::part1(client_id(), MAX_SIGNERS, MIN_SIGNERS, &mut rng).unwrap()
}

pub fn server_dkg_round1(
    client_part1_package: part1::Package,
) -> (part2::SecretPackage, part2::Package, part1::Package) {
    let mut rng = thread_rng();
    let (secret_package, part1_package) =
        dkg::part1(server_id(), MAX_SIGNERS, MIN_SIGNERS, &mut rng).unwrap();

    let client_part1_package = btreemap! {client_id() => client_part1_package};

    let (secret_package, part2_server_package) =
        dkg::part2(secret_package, &client_part1_package).unwrap();
    (
        secret_package,
        part2_server_package.get(&client_id()).unwrap().clone(),
        part1_package,
    )
}

pub fn client_dkg_round_2(
    secret_package: part1::SecretPackage,
    server_part1_package: part1::Package,
    server_part2_package: part2::Package,
) -> (KeyPackage, PublicKeyPackage, part2::Package) {
    println!(
        "client_dkg_round_2 server_part1_package: {:?}",
        server_part1_package
    );
    println!(
        "client_dkg_round_2 server_part2_package: {:?}",
        server_part2_package
    );
    let server_part1_package = btreemap! {server_id() => server_part1_package};
    let server_part2_package = btreemap! {server_id() => server_part2_package};
    let (secret_package, part2_package) =
        dkg::part2(secret_package, &server_part1_package).unwrap();
    let (key_package, pub_key_package) = dkg::part3(
        &secret_package,
        &server_part1_package,
        &server_part2_package,
    )
    .unwrap();
    (
        key_package,
        pub_key_package,
        part2_package.get(&server_id()).unwrap().clone(),
    )
}

pub fn server_dkg_round_2(
    secret_package: part2::SecretPackage,
    client_part1_package: part1::Package,
    client_part2_package: part2::Package,
) -> (KeyPackage, PublicKeyPackage) {
    let client_part1_package = btreemap! {client_id() => client_part1_package};
    let client_part2_package = btreemap! {client_id() => client_part2_package};
    dkg::part3(
        &secret_package,
        &client_part1_package,
        &client_part2_package,
    )
    .unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dkg_happy_path() {
        // round 1 client: client executing dkg part 1
        let (client_secret_package, client_part1_package) = client_dkg_round_1();

        // round 1 server: server executing dkg part 1 and part 2
        let (server_secret_package, server_part2_package, server_part1_package) =
            server_dkg_round1(client_part1_package.clone());

        // round 2 client: client executing dkg part 2 and part 3
        let (client_key_package, client_pub_key_package, client_part2_package) = client_dkg_round_2(
            client_secret_package,
            server_part1_package,
            server_part2_package,
        );

        // round 2 server: server executing dkg part 3
        let (server_key_package, server_pub_key_package) = server_dkg_round_2(
            server_secret_package,
            client_part1_package,
            client_part2_package,
        );

        assert_ne!(client_key_package, server_key_package);
        assert_eq!(client_pub_key_package, server_pub_key_package);
    }
}
