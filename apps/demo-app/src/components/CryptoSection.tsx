import type React from 'react';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface Crypto {
  name: string;
  balance: number;
}

interface CryptoSectionProps {
  cryptos: Crypto[];
  onSend: (crypto: Crypto) => void;
}

const CryptoSection: React.FC<CryptoSectionProps> = ({ cryptos, onSend }) => {
  return (
    <Stack direction="column" spacing={2}>
      {cryptos.map((crypto) => (
        <Card key={crypto.name}>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="div">
                {crypto.name}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" component="div">
                  {crypto.balance}
                </Typography>
                <IconButton
                  color="primary"
                  aria-label={`Send ${crypto.name}`}
                  onClick={() => onSend(crypto)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CryptoSection;
