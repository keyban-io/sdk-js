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
import productBosch from "../assets/Four_integrable_multifonction_Bosch_HBA171BS4F.json";
import productSmeg from "../assets/Grille_pain_Smeg_TSF01_2_fentes_Toaster_Noir.json";
import productSamsung from "../assets/Lave_linge_hublot_Samsung_Ecobubble_WW80CGC04DTH_8kg_Blanc.json";
import productLG from "../assets/Refrigerateur_combine_LG_GBV3100DEP_Noir.json";
import productLGTV from "../assets/TV_OLED_Evo_LG_OLED55C4_139cm_4K_UHD_Smart_TV_2024_Noir_et_Brun.json";

const products = [
  new Product(productBosch),
  new Product(productSmeg),
  new Product(productSamsung),
  new Product(productLG),
  new Product(productLGTV),
];

// Composant pour afficher les caractéristiques du produit
interface AttributesSectionProps {
  attributesMap: {
    [key: string]: { value: string | number; display_type?: string };
  };
}

// Updated AttributesSection component for improved rendering
const AttributesSection: React.FC<AttributesSectionProps> = ({
  attributesMap,
}) => (
  <Box sx={{ mt: 2, width: "100%" }}>
    <Box>
      {Object.entries(attributesMap).map(([attr, value]) => (
        <Box
          key={attr}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {attr}
          </Typography>
          {value.display_type === "date" ? (
            <Typography variant="body2">
              {formatDate(Number(value.value))}
            </Typography>
          ) : (
            <Typography variant="body2">{value.value}</Typography>
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const [expandedProduct, setExpandedProduct] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // new state for tabs
  // New state for events visibility
  const [showEvents, setShowEvents] = useState(false);
  // New state for extra section toggling: "documents" or "offres"
  const [expandedExtra, setExpandedExtra] = useState<
    "documents" | "offres" | null
  >(null);

  // Tri des événements par date (croissant)
  const sortedEvents = useMemo(() => {
    if (!product) return [];
    return Object.entries(product.eventsMap).sort(
      ([, aDate], [, bDate]) => (aDate as number) - (bDate as number),
    );
  }, [product]);

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  // Gestion d'une image de repli en cas d'erreur de chargement
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "fallback.png"; // Remplacer par le chemin de votre image de repli
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
          sx={{
            background: "linear-gradient(to right, #f0f0f0, #ffffff)",
          }}
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
              {/* Bar above product.name */}
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
              {/* Action buttons row updated to occupy full width */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: 2,
                  mt: 2,
                }}
              >
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
                  onClick={() => {}}
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
                  onClick={() => {}}
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
                  onClick={() => {}}
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
                  onClick={() => {}}
                >
                  <TransferIcon />
                  <Typography variant="caption">Transferer</Typography>
                </Button>
              </Box>
              {/* Updated full-width bar with rounded edges and centered */}
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
              {/* New row with two buttons for Documents and Offres */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: 2,
                  mt: 1,
                }}
              >
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
              {/* Optionally render extra content for Documents/Offres */}
              {expandedExtra && (
                <Box sx={{ mt: 2, textAlign: "left" }}>
                  {/* Contenu additionnel pour {expandedExtra} */}
                  <Typography variant="body2">
                    {/* ...placeholder content... */}
                    Contenu de {expandedExtra}
                  </Typography>
                </Box>
              )}
              {/* Unified toggle button for product information */}
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
              {/* Conditionally render the details content */}
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
              {/* New toggle button for events */}
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
              {/* Conditionally render the Timeline */}
              {showEvents && (
                <Timeline>
                  {sortedEvents.map(([eventKey, eventDate], index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent
                        align="right"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatDate(eventDate as number)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="secondary" />
                        {index < sortedEvents.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{eventKey}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
