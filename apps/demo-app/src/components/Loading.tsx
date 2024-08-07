import React from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Assure que l'indicateur de chargement est centré verticalement */
  background-color: var(--primary-lightest);
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 1.2em;
  color: var(--primary);
`;

const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <CircularProgress />
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
