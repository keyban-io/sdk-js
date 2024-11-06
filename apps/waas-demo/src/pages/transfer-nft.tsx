import type React from "react";
import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import TransferAlert from "@/components/TransferAlert";
import { useDebounce } from "@/hooks/useDebounce";
import { useTransferReducer } from "@/hooks/useTransferReducer";
import { getIndexerUrl } from "@/lib/getIndexerUrl";
import type { Address } from "@keyban/sdk-react";
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
  useKeybanAccountNfts,
  useKeybanClient,
} from "@keyban/sdk-react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface NftMetadataProperty {
  type: string;
  description: string;
  value: string;
}

interface NftMetadata {
  name?: string;
  description?: string;
  image?: string;
  properties?: {
    [key: string]: NftMetadataProperty;
  };
}

interface LocationState {
  nftId?: string;
}

const TransferNFT: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nftId } = (location.state as LocationState) || {};

  const [recipient, setRecipient] = useState<string>("");
  const [selectedNftId, setSelectedNftId] = useState<string>(nftId || "");
  const debouncedRecipient = useDebounce(recipient, 300);

  const {
    state: transferState,
    dispatch,
    handleSuccess,
    resetForm,
    transactionHistory,
  } = useTransferReducer();

  const client = useKeybanClient();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  const [nftBalances, nftsError] = useKeybanAccountNfts(account);
  if (nftsError) throw nftsError;

  const selectedNft = nftBalances.find((nftBalance) => nftBalance?.id === selectedNftId);
  const metadata = selectedNft?.nft?.metadata as NftMetadata;

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (!debouncedRecipient || !selectedNft) {
        dispatch({ type: "FEE_ESTIMATION_FAIL", payload: "" });
        return;
      }

      dispatch({ type: "START_FEE_ESTIMATION" });
      try {
        const estimation = await account.estimateNftTransfer({
          contractAddress: selectedNft.nft?.collection?.id as Address,
          tokenId: BigInt(selectedNft.nft!.tokenId),
          to: debouncedRecipient as Address,
          value: BigInt(1),
          standard: selectedNft.nft?.collection?.type === "erc721" ? "ERC721" : "ERC1155",
        });

        dispatch({
          type: "FEE_ESTIMATION_SUCCESS",
          payload: `${estimation.maxFees}`,
        });
      } catch (err) {
        dispatch({
          type: "FEE_ESTIMATION_FAIL",
          payload: `Failed to estimate fees: ${(err as Error).message}`,
        });
      }
    };
    estimateFeesAsync();
  }, [debouncedRecipient, selectedNft, account, dispatch]);

  const handleTransfer = async () => {
    dispatch({ type: "START_TRANSFER" });
    try {
      if (selectedNft && account && recipient) {
        const txHash = await account.transferNft({
          contractAddress: selectedNft.nft?.collection?.id as Address,
          tokenId: BigInt(selectedNft.nft!.tokenId),
          to: recipient as Address,
          standard: selectedNft.nft?.collection?.type === "erc721" ? "ERC721" : "ERC1155",
          value: BigInt(1),
        });
        handleSuccess(txHash);
        resetForm();
        setRecipient("");
        setSelectedNftId("");
      }
    } catch (err) {
      dispatch({
        type: "TRANSFER_FAIL",
        payload: `Transfer failed: ${(err as Error).message}`,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Transfer an NFT
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {nftBalances.length > 0 ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="select-nft-label">Select an NFT</InputLabel>
                  <Select
                    labelId="select-nft-label"
                    id="select-nft"
                    value={selectedNftId}
                    label="Select an NFT"
                    onChange={(e) => setSelectedNftId(e.target.value as string)}
                  >
                    {nftBalances.map((nftBalance) => {
                      if (!nftBalance) return null;

                      const nftMetadata = nftBalance.nft?.metadata as NftMetadata;
                      return (
                        <MenuItem key={nftBalance.id} value={nftBalance.id}>
                          {nftMetadata.name ?? `NFT ID: ${nftBalance.nft?.tokenId}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {selectedNft && metadata?.image && (
                  <CardActionArea
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/nft-details/${selectedNft.id}`)}
                  >
                    <CardMedia
                      component="img"
                      image={metadata.image}
                      alt={metadata?.name ?? "NFT Image"}
                      sx={{
                        width: "100%",
                        height: 400,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  </CardActionArea>
                )}
              </>
            ) : (
              <Alert severity="info">You have no NFTs to transfer.</Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">Account Information</Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {account.address}
              </Typography>
              <Typography variant="body1">
                <strong>Native Balance (for fees):</strong>{" "}
                <FormattedBalance balance={balance} />
              </Typography>

              <Divider />

              <Typography variant="h6">Recipient Information</Typography>
              <TextField
                id="recipient-address"
                label="Recipient Address"
                placeholder="0xRecipientAddress"
                onChange={(e) => setRecipient(e.target.value)}
                value={recipient}
                fullWidth
              />

              <TransferAlert
                isEstimatingFees={transferState.isEstimatingFees}
                amount="1"
                recipient={recipient}
                rawMaxFees={transferState.feeEstimate}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleTransfer}
                disabled={
                  transferState.isTransferring ||
                  !recipient ||
                  !selectedNftId ||
                  nftBalances.length === 0
                }
                sx={{ mt: 2 }}
              >
                {transferState.isTransferring ? (
                  <>
                    Transferring...
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  </>
                ) : (
                  "Send NFT"
                )}
              </Button>

              {transactionHistory.length > 0 && (
                <Alert severity="success">
                  <Typography variant="h6">Recent Transactions:</Typography>
                  {transactionHistory.map((txHash, index) => (
                    <Typography key={txHash}>
                      Transaction {index + 1}:{" "}
                      <Link
                        underline="always"
                        href={getIndexerUrl(client.chain, txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {txHash}
                      </Link>
                    </Typography>
                  ))}
                </Alert>
              )}

              {transferState.error && (
                <Alert severity="error">
                  <Typography>{transferState.error}</Typography>
                </Alert>
              )}
            </Stack>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{ mt: 4 }}
        >
          Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default TransferNFT;
