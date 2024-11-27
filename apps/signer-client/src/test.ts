import * as jose from "jose";

import { RpcClient } from "~/rpc";

const API_URL = "https://api.keyban.localtest.me";
const ACCESS_TOKEN_ALG = "PS256";

async function createApp() {
  const { publicKey, privateKey } = await jose.generateKeyPair(
    ACCESS_TOKEN_ALG,
    { extractable: true },
  );

  const jwk = await jose.exportJWK(publicKey);
  const jwks = {
    keys: [{ use: "sig", alg: ACCESS_TOKEN_ALG, ...jwk }],
  };
  const jwksUri = `data:text/plain;base64,${btoa(JSON.stringify(jwks))}`;

  const { app_id } = await fetch(new URL("/applications", API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jwksUri }),
  }).then((res) => res.json());

  return {
    id: app_id,
    pkcs8Pem: await jose.exportPKCS8(privateKey),
  };
}

async function createAccessToken(app: { id: string; pkcs8Pem: string }) {
  const privateKey = await jose.importPKCS8(app.pkcs8Pem, ACCESS_TOKEN_ALG);
  const accessToken = await new jose.SignJWT()
    .setProtectedHeader({ alg: ACCESS_TOKEN_ALG })
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setIssuer("KEYBAN_IFRAME")
    .setAudience(API_URL)
    .setExpirationTime("2h")
    .setSubject(crypto.randomUUID())
    .sign(privateKey);

  return accessToken;
}

(async () => {
  const iframeUrl = new URL("/public/iframe", window.origin);
  const client = new RpcClient(iframeUrl);

  const app = await createApp();
  const accessToken = await createAccessToken(app);
  const res = await client.call("ecdsa", "dkg", API_URL, app.id, accessToken);

  console.log("DKG result", JSON.parse(res));
})();
