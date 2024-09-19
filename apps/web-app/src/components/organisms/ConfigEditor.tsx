import Row from "@/components/atoms/Row";
import SelectField from "@/components/molecules/SelectField";
import TextField from "@/components/molecules/TextField";
import {
  KeybanChain,
  KeybanClientConfig,
  KeybanSigner,
} from "@keyban/sdk-react";
import React from "react";

type Config = Omit<KeybanClientConfig, "accessTokenProvider"> & {
  accessToken: string;
};

export type ConfigEditorProps = Omit<
  React.HTMLProps<HTMLFieldSetElement>,
  "children" | "onChange"
> & {
  config: Config;
  onChange: (config: Config) => void;
};

export default function ConfigEditor({ config, onChange }: ConfigEditorProps) {
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
          data-test-id="ConfigEditor:appId"
        />

        <button
          onClick={() => {
            fetch(new URL("/applications", config.apiUrl), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                jwksUri: new URL("/public/jwks.json", "http://localhost:3000"),
              }),
            })
              .then((res) => res.json())
              .then(({ app_id }) => onChange({ ...config, appId: app_id }));
          }}
        >
          Create App ID
        </button>
      </Row>

      <TextField
        label="Access token"
        value={config.accessToken}
        onChange={(accessToken) => onChange({ ...config, accessToken })}
        data-test-id="ConfigEditor:accessToken"
      />

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
