import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Assure que l'indicateur de chargement est centré verticalement */
  background-color: var(--primary-lightest);
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 1.2em;
  color: var(--primary);
`;

const Loading: React.FC = () => {
  return (
    <LoadingWrapper>
      <div>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </div>
    </LoadingWrapper>
  );
};

export default Loading;
