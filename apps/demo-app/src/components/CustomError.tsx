// src/components/CustomError.tsx

import type React from 'react';
import styled from 'styled-components';

interface CustomErrorProps {
  message: string;
}

const ErrorWrapper = styled.div`
  color: red;
  font-weight: bold;
`;

const CustomError: React.FC<CustomErrorProps> = ({ message }) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
};

export default CustomError;
