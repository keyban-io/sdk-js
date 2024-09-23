import React from "react";
import * as jose from "jose";
import {
  KeybanChain,
  KeybanClientConfig,
  KeybanSigner,
} from "@keyban/sdk-react";

import Row from "@/components/atoms/Row";
import SelectField from "@/components/molecules/SelectField";
import TextField from "@/components/molecules/TextField";

type Config = Omit<KeybanClientConfig, "accessTokenProvider"> & {
  accessToken: string;
};

export type ConfigEditorProps = Omit<
  React.HTMLProps<HTMLFieldSetElement>,
  "children" | "onChange"
> & {
  config: Config;
  onChange: (config: Config) => unknown;
};

export default function ConfigEditor({ config, onChange }: ConfigEditorProps) {
  const alg = "PS256";

  const handleCreateApp = async () => {
    const { publicKey, privateKey } = await jose.generateKeyPair(alg, {
      extractable: true,
    });

    const jwk = await jose.exportJWK(publicKey);
    const jwks = {
      keys: [{ use: "sig", alg, ...jwk }],
    };
    const jwksUri = `data:text/plain;base64,${btoa(JSON.stringify(jwks))}`;

    const { app_id } = await fetch(new URL("/applications", config.apiUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwksUri }),
    }).then((res) => res.json());

    localStorage.setItem(
      `keyban:cert:${app_id}`,
      await jose.exportPKCS8(privateKey),
    );

    onChange({ ...config, appId: app_id });
  };

  const handleCreateAccessToken = async () => {
    const pkcs8Pem = localStorage.getItem(`keyban:cert:${config.appId}`);
    if (!pkcs8Pem)
      return alert(
        `Cannot find cert for app id ${config.appId}, try re-generate new one`,
      );

    const privateKey = await jose.importPKCS8(pkcs8Pem, alg);

    const accessToken = await new jose.SignJWT()
      .setProtectedHeader({ alg })
      .setJti(crypto.randomUUID())
      .setIssuedAt()
      .setIssuer("KEYBAN_WEB_APP")
      .setAudience("keyban")
      .setExpirationTime("2h")
      .setSubject(crypto.randomUUID())
      .sign(privateKey);

    onChange({ ...config, accessToken });
  };

  return (
    <fieldset data-test-id="config-editor">
      <legend>Client config</legend>

      <TextField
        label="API URL"
        value={config.apiUrl}
        onChange={(apiUrl) => onChange({ ...config, apiUrl })}
        data-test-id="ConfigEditor:apiUrl"
      />

      <Row>
        <TextField
          label="App ID"
          value={config.appId}
          onChange={(appId) => onChange({ ...config, appId })}
          style={{ marginBlock: 0 }}
          data-test-id="ConfigEditor:appId"
        />

        <button onClick={handleCreateApp}>Create an App ID</button>
      </Row>

      <Row>
        <TextField
          label="Access token"
          value={config.accessToken}
          onChange={(accessToken) => onChange({ ...config, accessToken })}
          style={{ marginBlock: 0 }}
          data-test-id="ConfigEditor:accessToken"
        />

        <button onClick={handleCreateAccessToken}>
          Create an access token
        </button>
      </Row>

      <SelectField
        label="Chain"
        value={config.chain}
        onChange={(chain) =>
          onChange({ ...config, chain: chain as KeybanChain })
        }
        data-test-id="ConfigEditor:chain"
      >
        {Object.entries(KeybanChain).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </SelectField>

      <Row>
        <span>Signer:</span>
        {Object.entries(KeybanSigner).map(([key, value]) => (
          <label key={key}>
            <input
              type="radio"
              name="signer"
              value={key}
              checked={value === config.signer}
              onChange={(e) =>
                onChange({ ...config, signer: KeybanSigner[e.target.value] })
              }
              data-test-id={`ConfigEditor:signer:${key}`}
            />
            <span>{key}</span>
          </label>
        ))}
      </Row>
    </fieldset>
  );
}
