import type React from "react";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Balance,
  FormattedBalance,
} from "@keyban/sdk-react";
import {
  Button,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

interface BalanceInfoProps {
  balance: Balance | undefined;
  euroBalance: number | null;
  onSend: () => void;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({
  balance,
  euroBalance,
  onSend,
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Stack direction="row" alignItems="center">
        <Tooltip title="Cryptocurrency Balance" arrow>
          <Typography variant="h6">
            {balance != null && <FormattedBalance balance={{ ...balance, isNative: true }} />}
          </Typography>
        </Tooltip>
      </Stack>

      <Tooltip title="Equivalent Euro Balance" arrow>
        <Typography variant="body2">
          {euroBalance != null && <span>€{euroBalance.toFixed(2)}</span>}
        </Typography>
      </Tooltip>
      <Button
        variant="contained"
        onClick={onSend}
        startIcon={<FontAwesomeIcon className="fa" icon={faPaperPlane} />}
      >
        Send
      </Button>
    </Stack>
  );
};

export default BalanceInfo;
