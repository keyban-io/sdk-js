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
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

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
  const [quantity, setQuantity] = useState<number>(1);
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

  const selectedNft = nftBalances?.edges.find(
    ({ node }) => node?.id === selectedNftId,
  )?.node;
  const metadata = selectedNft?.nft?.metadata as NftMetadata;
  const isERC1155 = selectedNft?.nft?.collection?.type === "erc1155";
  const userNftBalance = Number(selectedNft?.balance ?? 0);

  const isQuantityValid =
    !isERC1155 || (quantity >= 1 && quantity <= userNftBalance);

  useEffect(() => {
    setQuantity(1);
  }, []);

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (!debouncedRecipient || !selectedNft || !isQuantityValid) {
        dispatch({ type: "FEE_ESTIMATION_FAIL", payload: "" });
        return;
      }

      dispatch({ type: "START_FEE_ESTIMATION" });
      try {
        const value = isERC1155 ? BigInt(quantity) : BigInt(1);

        const estimation = await account.estimateNftTransfer({
          contractAddress: selectedNft.nft?.collection?.id as Address,
          tokenId: BigInt(selectedNft.nft?.tokenId ?? 0),
          to: debouncedRecipient as Address,
          value: value,
          standard: isERC1155 ? "ERC1155" : "ERC721",
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
  }, [
    debouncedRecipient,
    selectedNft,
    account,
    dispatch,
    isERC1155,
    quantity,
    isQuantityValid,
  ]);

  const handleTransfer = async () => {
    dispatch({ type: "START_TRANSFER" });
    try {
      if (selectedNft && account && recipient && isQuantityValid) {
        const value = isERC1155 ? BigInt(quantity) : BigInt(1);

        const txHash = await account.transferNft({
          contractAddress: selectedNft.nft?.collection?.id as Address,
          tokenId: BigInt(selectedNft.nft?.tokenId ?? 0),
          to: recipient as Address,
          standard: isERC1155 ? "ERC1155" : "ERC721",
          value: value,
        });
        handleSuccess(txHash);
        resetForm();
        setRecipient("");
        setSelectedNftId("");
        setQuantity(1);
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
      <Card sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Transfer an NFT
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            {nftBalances?.edges.length ? (
              <>
                <FormControl fullWidth>
                  <InputLabel id="select-nft-label">Select an NFT</InputLabel>
                  <Select
                    labelId="select-nft-label"
                    id="select-nft"
                    value={selectedNftId}
                    label="Select an NF"
                    onChange={(e) => setSelectedNftId(e.target.value as string)}
                  >
                    {nftBalances.edges.map(({ node }) => {
                      if (!node) return null;

                      const nftMetadata = node.nft?.metadata as NftMetadata;
                      const nftName =
                        nftMetadata.name ?? `NFT ID: ${node.nft?.tokenId}`;
                      return (
                        <MenuItem key={node.id} value={node.id}>
                          {nftName}{" "}
                          {node.nft?.collection?.type === "erc1155"
                            ? ` (x${node.balance})`
                            : ""}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {selectedNft && (
                  <Card sx={{ mt: 4 }}>
                    <CardActionArea
                      onClick={() => navigate(`/nft-details/${selectedNft.id}`)}
                    >
                      {metadata?.image && (
                        <CardMedia
                          component="img"
                          image={metadata.image}
                          alt={metadata?.name ?? "NFT Image"}
                          sx={{
                            width: "100%",
                            height: 300,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6">
                          {metadata?.name ?? "NFT Name"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {metadata?.description ?? "No description available."}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )}
              </>
            ) : (
              <Alert severity="info">You have no NFTs to transfer.</Alert>
            )}
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography variant="h6">Account Information</Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {account.address}
              </Typography>
              <Typography variant="body1">
                <strong>Native balance (for fees):</strong>{" "}
                <FormattedBalance balance={{...balance, isNative: true}} />
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

              {isERC1155 && selectedNft && (
                <>
                  <Typography variant="body1">
                    <strong>Your balance of this NFT:</strong> {userNftBalance}
                  </Typography>
                  <TextField
                    id="quantity"
                    label="Quantity to send"
                    type="number"
                    inputProps={{ min: 1, max: userNftBalance }}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    error={!isQuantityValid}
                    helperText={
                      !isQuantityValid
                        ? `Enter a value between 1 and ${userNftBalance}`
                        : ""
                    }
                    fullWidth
                  />
                </>
              )}

              <TransferAlert
                isEstimatingFees={transferState.isEstimatingFees}
                amount={isERC1155 ? String(quantity) : "1"}
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
                  nftBalances?.totalCount === 0 ||
                  !isQuantityValid
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
                <Alert severity="success" sx={{ mt: 2 }}>
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
                <Alert severity="error" sx={{ mt: 2 }}>
                  <Typography>{transferState.error}</Typography>
                </Alert>
              )}
            </Stack>
          </Grid2>
        </Grid2>

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
