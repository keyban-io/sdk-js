import React from "react";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";

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

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 20px; /* Espacement des éléments */
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 1em;
  color: var(--primary);
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: #fff;
  color: var(--primary);
  outline: none;

  &:focus {
    border-color: var(--primary-hover-color);
  }
`;

const EnvSelector: React.FC<EnvSelectorProps> = ({
  envs,
  selectedEnvId,
  onSelectEnv,
}) => {
  return (
    <SelectorContainer>
      <Tooltip title="Select Env" arrow>
        <Label htmlFor="env-select">Env:</Label>
      </Tooltip>
      <Select
        id="env-select"
        value={selectedEnvId}
        onChange={(e) => onSelectEnv(e.target.value)}
      >
        {envs.map((envs) => (
          <option key={envs.id} value={envs.id}>
            {envs.name}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  );
};

export default EnvSelector;
