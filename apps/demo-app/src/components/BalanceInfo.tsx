import type React from "react";
import { FormattedBalance } from "@keyban/sdk-react";
import { Button, Stack, Tooltip, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

interface BalanceInfoProps {
  balance: bigint | undefined;
  euroBalance: number | null;
  onSend: () => void;
  onRefreshBalance: () => void;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({
  balance,
  euroBalance,
  onSend,
  onRefreshBalance,
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
          <Typography variant="h5">
            {balance != null && <FormattedBalance balance={balance} />}
          </Typography>
        </Tooltip>
        <IconButton color="primary" onClick={onRefreshBalance} size="small">
          <FontAwesomeIcon className="fa" icon={faArrowsRotate} />
        </IconButton>
      </Stack>

      <Tooltip title="Equivalent Euro Balance" arrow>
        <Typography variant="body1">
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
