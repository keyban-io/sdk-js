use std::collections::BTreeMap;

use frost_ed25519 as frost;
use maplit::btreemap;
use rand::thread_rng;

use crate::dkg;

pub type SecretSigningNonces = frost::round1::SigningNonces;
pub type PublicSigningCommitments = frost::round1::SigningCommitments;
pub type PublicSignatureShare = frost::round2::SignatureShare;
pub type Signature = frost::Signature;

pub fn client_sign_step_1(
    secret_key_package: &dkg::SecretKeyPackage,
) -> (SecretSigningNonces, PublicSigningCommitments) {
    // Client round 1
    let mut rng = thread_rng();

    frost::round1::commit(secret_key_package.signing_share(), &mut rng)
}

pub fn server_sign(
    secret_key_package: dkg::SecretKeyPackage,
    message: &[u8],
    client_commitments: PublicSigningCommitments,
) -> Result<(PublicSigningCommitments, PublicSignatureShare), frost::Error> {
    // Server round 1
    let mut rng = thread_rng();

    let (server_nonces, server_commitments) =
        frost::round1::commit(secret_key_package.signing_share(), &mut rng);
    let commitments_map = btreemap! {
        dkg::client_id() => client_commitments,
        dkg::server_id() => server_commitments
    };

    let signing_package = frost::SigningPackage::new(commitments_map, message);

    // Server round 2

    let signature_share =
        frost::round2::sign(&signing_package, &server_nonces, &secret_key_package)?;
    Ok((server_commitments, signature_share))
}

pub fn client_sign_step_2(
    key_pair: &dkg::KeyPair,
    message: &[u8],
    commitments_map: BTreeMap<frost::Identifier, PublicSigningCommitments>,
    client_nonces: &SecretSigningNonces,
    server_signature_share: PublicSignatureShare,
) -> Result<Signature, frost::Error> {
    // Client round 2
    let signing_package = frost::SigningPackage::new(commitments_map, message);
    let signature_share =
        frost::round2::sign(&signing_package, client_nonces, &key_pair.secret_key)?;

    let signature_shares = btreemap! {
        dkg::server_id() => server_signature_share,
        dkg::client_id() => signature_share
    };
    frost::aggregate(&signing_package, &signature_shares, &key_pair.public_key)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::dkg;

    #[test]
    fn sign_lib_generates_valid_signature() {
        // DKG
        let (client_round1_secret_package, client_round1_package) =
            dkg::client_dkg_round_1().unwrap();

        // round 1 server: server executing dkg part 1 and part 2
        let (server_round1_secret_package, server_package) =
            dkg::server_dkg_round_1(client_round1_package.clone()).unwrap();

        // round 2 client: client executing dkg part 2 and part 3
        let (client_keypair, client_round2_package) =
            dkg::client_dkg_round_2(client_round1_secret_package, server_package).unwrap();

        // round 2 server: server executing dkg part 3
        let server_keypair = dkg::server_dkg_round_2(
            server_round1_secret_package,
            client_round1_package,
            client_round2_package,
        )
        .unwrap();

        assert_eq!(client_keypair.public_key, server_keypair.public_key);

        // Signature
        let message = b"Hello, world!";
        let (client_nonces, client_commitments) = client_sign_step_1(&client_keypair.secret_key);
        let (server_commitments, server_signature_share) =
            server_sign(server_keypair.secret_key, message, client_commitments).unwrap();
        let commitments_map = btreemap! {
            dkg::server_id() => server_commitments,
            dkg::client_id() => client_commitments
        };
        let signature = client_sign_step_2(
            &client_keypair,
            message,
            commitments_map,
            &client_nonces,
            server_signature_share,
        )
        .unwrap();
        let is_signature_valid = client_keypair
            .public_key
            .verifying_key()
            .verify(message, &signature)
            .is_ok();
        assert!(is_signature_valid);
    }
}
