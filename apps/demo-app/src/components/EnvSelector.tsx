import React from "react";
import { Select, MenuItem, FormControl, FormHelperText } from "@mui/material";

interface Env {
  id: string;
  name: string;
  apiUrl: string;
}

interface EnvSelectorProps {
  envs: Env[];
  selectedEnvId: string;
  onSelectEnv: (envId: string) => void;
}

const EnvSelector: React.FC<EnvSelectorProps> = ({
  envs,
  selectedEnvId,
  onSelectEnv,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        variant="standard"
        id="env-select"
        label="Env"
        value={selectedEnvId}
        onChange={(e) => onSelectEnv(e.target.value)}
      >
        {envs.map((envs) => (
          <MenuItem key={envs.id} value={envs.id}>
            {envs.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Env</FormHelperText>
    </FormControl>
  );
};

export default EnvSelector;
