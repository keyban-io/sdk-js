import React, { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import RepairIcon from "@mui/icons-material/Build";
import RecycleIcon from "@mui/icons-material/Autorenew";
import TransferIcon from "@mui/icons-material/TransferWithinAStation";
import EuroIcon from "@mui/icons-material/Euro";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import ArticleIcon from "@mui/icons-material/Article";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HistoryIcon from "@mui/icons-material/History";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import { formatDate } from "../utils/formatDate";
import Product from "../models/Product";
import AttributesSection from "../components/AttributesSection";
import DocumentsSection from "../components/DocumentsSection";
import OffersSection from "../components/OffersSection";
import { useKeybanAccount, useKeybanAccountNft } from "@keyban/sdk-react";
const fallbackImage = `data:image/svg+xml;utf8,<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none"><rect width="200" height="200" fill="#e0e0e0"/><circle cx="100" cy="80" r="30" fill="#bdbdbd"/><rect x="50" y="130" width="100" height="40" rx="10" fill="#bdbdbd"/><text x="50%" y="180" text-anchor="middle" fill="#757575" font-size="16px" font-family="Arial">Image indisponible</text></svg>`;

// Composant pour les boutons d'actions
const ActionButtons = () => {
  const handleAction = (actionName: string) => {
    // Placeholder pour une future implémentation
    alert(`Fonctionnalité "${actionName}" en cours de développement.`);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 2, mt: 2 }}>
      <Button
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          backgroundColor: "var(--mui-palette-background-paper)",
        }}
        onClick={() => handleAction("Réparer")}
      >
        <RepairIcon />
        <Typography variant="caption">Réparer</Typography>
      </Button>
      <Button
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          backgroundColor: "var(--mui-palette-background-paper)",
        }}
        onClick={() => handleAction("Revendre")}
      >
        <EuroIcon />
        <Typography variant="caption">Revendre</Typography>
      </Button>
      <Button
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          backgroundColor: "var(--mui-palette-background-paper)",
        }}
        onClick={() => handleAction("Recycler")}
      >
        <RecycleIcon />
        <Typography variant="caption">Recycler</Typography>
      </Button>
      <Button
        variant="outlined"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "16px",
          backgroundColor: "var(--mui-palette-background-paper)",
        }}
        onClick={() => handleAction("Transferer")}
      >
        <TransferIcon />
        <Typography variant="caption">Transferer</Typography>
      </Button>
    </Box>
  );
};

// Composant pour la section "Documents" ou "Offres"
const ExtraSection = ({
  expandedExtra,
  product,
}: {
  expandedExtra: "documents" | "offres" | null;
  product: Product;
}) => (
  <Box sx={{ mt: 2, textAlign: "left" }}>
    <Typography variant="body2">
      {expandedExtra === "documents" ? (
        <DocumentsSection documents={product.documents} />
      ) : (
        <>
          Offres
          <OffersSection offers={product.offers} />
        </>
      )}
    </Typography>
  </Box>
);

// Composant pour la Timeline des événements
const TimelineEvents = ({
  sortedEvents,
}: {
  sortedEvents: [string, number][];
}) => (
  <Timeline>
    {sortedEvents.map(([eventKey, eventDate], index) => (
      <TimelineItem key={index}>
        <TimelineOppositeContent
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {formatDate(eventDate)}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          {index < sortedEvents.length - 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography>{eventKey}</Typography>
        </TimelineContent>
      </TimelineItem>
    ))}
  </Timeline>
);

export default function ProductDetails() {
  // Extraction des paramètres depuis l'URL
  const { tokenAddress, tokenId } = useParams<{
    tokenAddress: string;
    tokenId: string;
  }>();

  const [account, accountError] = useKeybanAccount();
  const [nftBalance, nftError] = useKeybanAccountNft(
    account!,
    tokenAddress as `0x${string}`,
    tokenId!,
  );

  // États locaux
  const [expandedProduct, setExpandedProduct] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showEvents, setShowEvents] = useState(false);
  const [expandedExtra, setExpandedExtra] = useState<
    "documents" | "offres" | null
  >(null);

  // Construction du produit et tri des événements (hooks sont appelés inconditionnellement)
  const product = useMemo(() => {
    return nftBalance && nftBalance.nft?.metadata
      ? new Product(nftBalance.nft.metadata)
      : null;
  }, [nftBalance]);

  const sortedEvents = useMemo(() => {
    if (!product) return [];
    return Object.entries(product.eventsMap).sort(
      ([, aDate], [, bDate]) => aDate - bDate,
    );
  }, [product]);

  // Gestion des erreurs et états de chargement
  if (accountError) {
    return <div>Error fetching account: {accountError.message}</div>;
  }
  if (!account) {
    return <div>Loading account...</div>;
  }
  if (nftError) {
    return <div>Error fetching NFT: {nftError.message}</div>;
  }
  if (!nftBalance) {
    return <div>Loading NFT...</div>;
  }
  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  // Gestion de l'image de repli
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = fallbackImage;
  };

  return (
    <Container sx={{ pb: 4, position: "relative" }} disableGutters>
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          mb: 2,
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={handleImageError}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card>
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          position: "relative",
          zIndex: 1,
          mt: -4,
        }}
      >
        <CardContent
          sx={{ background: "linear-gradient(to right, #f0f0f0, #ffffff)" }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              {/* Barre décorative */}
              <Box
                sx={{
                  width: "10%",
                  height: "2px",
                  backgroundColor: "primary.main",
                  margin: "auto",
                  borderRadius: "2px",
                  mb: 1,
                }}
              />
              <Typography variant="h5">{product.name}</Typography>

              {/* Boutons d'actions */}
              <ActionButtons />

              <Box
                sx={{
                  width: "100%",
                  height: "2px",
                  mt: 2,
                  mb: 2,
                  backgroundColor: "primary.main",
                  borderRadius: "2px",
                  mx: "auto",
                }}
              />
              {/* Boutons pour afficher les sections Documents/Offres */}
              <Box sx={{ display: "flex", width: "100%", gap: 2, mt: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setExpandedExtra((prev) =>
                      prev === "documents" ? null : "documents",
                    )
                  }
                  sx={{
                    flex: 1,
                    borderRadius: "16px",
                    backgroundColor: "var(--mui-palette-background-paper)",
                    height: "56px",
                  }}
                  endIcon={
                    expandedExtra === "documents" ? (
                      <ExpandLessIcon />
                    ) : (
                      <ArticleIcon />
                    )
                  }
                >
                  Documents
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setExpandedExtra((prev) =>
                      prev === "offres" ? null : "offres",
                    )
                  }
                  sx={{
                    flex: 1,
                    borderRadius: "16px",
                    height: "56px",
                    backgroundColor: "var(--mui-palette-background-paper)",
                  }}
                  endIcon={
                    expandedExtra === "offres" ? (
                      <ExpandLessIcon />
                    ) : (
                      <DiscountOutlinedIcon />
                    )
                  }
                >
                  Offres
                </Button>
              </Box>
              {expandedExtra && (
                <ExtraSection expandedExtra={expandedExtra} product={product} />
              )}

              {/* Bouton pour afficher/cacher les informations produit */}
              <Button
                variant="outlined"
                onClick={() => setExpandedProduct(!expandedProduct)}
                sx={{
                  mt: 2,
                  width: "100%",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  height: "56px",
                  backgroundColor: "var(--mui-palette-background-paper)",
                }}
                endIcon={
                  expandedProduct ? <ExpandLessIcon /> : <SubjectOutlinedIcon />
                }
              >
                {expandedProduct
                  ? "Cacher les informations produit"
                  : "Voir les informations produit"}
              </Button>
              {expandedProduct && (
                <>
                  <Tabs
                    value={selectedTab}
                    onChange={(_, newValue) => setSelectedTab(newValue)}
                    variant="fullWidth"
                    sx={{ mt: 2 }}
                  >
                    <Tab label="Description" />
                    <Tab label="Caractéristiques" />
                  </Tabs>
                  {selectedTab === 0 && (
                    <Box sx={{ mt: 2 }}>
                      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                        {product.description}
                      </ReactMarkdown>
                    </Box>
                  )}
                  {selectedTab === 1 && (
                    <AttributesSection attributesMap={product.attributesMap} />
                  )}
                  <Box
                    sx={{
                      width: "100%",
                      height: "2px",
                      mt: 2,
                      mb: 1,
                      backgroundColor: "primary.main",
                      borderRadius: "2px",
                      mx: "auto",
                    }}
                  />
                </>
              )}
              {/* Bouton et affichage de l'historique */}
              <Button
                variant="outlined"
                onClick={() => setShowEvents((prev) => !prev)}
                sx={{
                  mt: 2,
                  width: "100%",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  height: "56px",
                  backgroundColor: "var(--mui-palette-background-paper)",
                }}
                endIcon={showEvents ? <ExpandLessIcon /> : <HistoryIcon />}
              >
                {showEvents ? "Cacher l'historique" : "Voir l'historique"}
              </Button>
              {showEvents && <TimelineEvents sortedEvents={sortedEvents} />}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
