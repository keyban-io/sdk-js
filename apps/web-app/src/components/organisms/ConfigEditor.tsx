import { KeybanChain, KeybanClientConfig } from "@keyban/sdk-react";
import React from "react";

import Row from "~/components/atoms/Row";
import SelectField from "~/components/molecules/SelectField";
import TextField from "~/components/molecules/TextField";

type Config = Omit<KeybanClientConfig, "clientShareProvider">;

export type ConfigEditorProps = Omit<
  React.HTMLProps<HTMLFieldSetElement>,
  "children" | "onChange"
> & {
  config: Config;
  onChange: (config: Config) => unknown;
};

export default function ConfigEditor({ config, onChange }: ConfigEditorProps) {
  return (
    <fieldset data-test-id="ConfigEditor">
      <legend>Client config</legend>

      <TextField
        label="API URL"
        value={config.apiUrl?.toString()}
        onChange={(value) => onChange({ ...config, apiUrl: new URL(value) })}
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
    </fieldset>
  );
}
