import type React from 'react';
import styled from 'styled-components';

interface CustomErrorProps {
  error: Error;
}

const ErrorWrapper = styled.div`
  padding: 20px;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 4px;
  color: #842029;
  font-weight: bold;
  max-width: 600px;
  margin: 20px auto;
`;

const ErrorMessage = styled.div`
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const ErrorStack = styled.pre`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  color: #6c757d;
  overflow-x: auto;
`;

const CustomError: React.FC<CustomErrorProps> = ({ error }) => {
  return (
    <ErrorWrapper>
      <ErrorMessage>{error.message}</ErrorMessage>
      {error.stack && <ErrorStack>{error.stack}</ErrorStack>}
    </ErrorWrapper>
  );
};

export default CustomError;
