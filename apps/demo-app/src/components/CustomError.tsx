import type React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface CustomErrorProps {
  error: Error;
}

const CustomError: React.FC<CustomErrorProps> = ({ error }) => {
  return (
    <Alert severity="error" sx={{ maxWidth: 600, margin: '20px auto' }}>
      <AlertTitle>{error.message}</AlertTitle>
      {error.stack && (
        <Box component="pre" sx={{ overflowX: 'auto' }}>
          {error.stack}
        </Box>
      )}
    </Alert>
  );
};

export default CustomError;
