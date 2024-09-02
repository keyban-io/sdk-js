import Row from "@/components/atoms/Row";
import SelectField from "@/components/molecules/SelectField";
import TextField from "@/components/molecules/TextField";
import {
  KeybanChain,
  KeybanClientConfig,
  KeybanSigner,
} from "@keyban/sdk-react";
import React from "react";

export type ConfigEditorProps = Omit<
  React.HTMLProps<HTMLFieldSetElement>,
  "children" | "onChange"
> & {
  config: KeybanClientConfig;
  onChange: (config: KeybanClientConfig) => void;
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

      <TextField
        label="Chain URL"
        value={config.chainUrl}
        onChange={(chainUrl) => onChange({ ...config, chainUrl })}
        data-test-id="ConfigEditor:chainUrl"
      />

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
