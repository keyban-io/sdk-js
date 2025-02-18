import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid2,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
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
import Tooltip from "@mui/material/Tooltip";
import EuroIcon from "@mui/icons-material/Euro";
import IconButton from "@mui/material/IconButton";
import productBosch from "../assets/Four_integrable_multifonction_Bosch_HBA171BS4F.json";
import productSmeg from "../assets/Grille_pain_Smeg_TSF01_2_fentes_Toaster_Noir.json";
import productSamsung from "../assets/Lave_linge_hublot_Samsung_Ecobubble_WW80CGC04DTH_8kg_Blanc.json";
import productLG from "../assets/Refrigerateur_combine_LG_GBV3100DEP_Noir.json";
import productLGTV from "../assets/TV_OLED_Evo_LG_OLED55C4_139cm_4K_UHD_Smart_TV_2024_Noir_et_Brun.json";
import Product from "../models/Product";
import { formatDate } from "../utils/formatDate";
import ReactMarkdown from "react-markdown"; // added import
import React from "react";

const products = [
  // Consolidated product data from JSON files
  new Product(productBosch),
  new Product(productSmeg),
  new Product(productSamsung),
  new Product(productLG),
  new Product(productLGTV),
];

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const [expanded, setExpanded] = useState(false); // added state

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

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
        <img src={product.image} alt={product.name} />
        <Box
          sx={{
            position: "absolute",
            bottom: 32, // Adjusted to move the buttons slightly above the bottom
            right: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <Tooltip title="Réparer">
            <IconButton
              color="primary"
              aria-label="repair"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <RepairIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Revendre">
            <IconButton
              color="primary"
              aria-label="sell"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <EuroIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recycler">
            <IconButton
              color="primary"
              aria-label="recycle"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <RecycleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Transferer">
            <IconButton
              color="primary"
              aria-label="transfer"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <TransferIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
      <Card
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          position: "relative",
          zIndex: 1,
          mt: -4, // Adjust margin top to position above the first card
        }}
      >
        <CardContent
          sx={{
            background: "linear-gradient(to right, #f0f0f0, #ffffff)", // Adjust gradient background to start with a lighter gray
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
              <Typography variant="h5">{product.name}</Typography>
              {/* Render markdown description with toggle */}
              <Box
                sx={{ maxHeight: expanded ? "none" : 150, overflow: "hidden" }}
              >
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </Box>
              <Button
                onClick={() => setExpanded((prev) => !prev)}
                sx={{ mt: 1 }}
                size="small"
              >
                {expanded ? "Voir moins" : "Voir plus"}
              </Button>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.attributesMap["Status"]}
              </Typography>
              {product.attributesMap["Ownership status"] && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.attributesMap["Ownership status"]}
                </Typography>
              )}
              {product.attributesMap["Acquisition date"] && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date d’acquisition :{" "}
                  {formatDate(
                    product.attributesMap["Acquisition date"] as number,
                  )}
                </Typography>
              )}
              {product.eventsMap["Acquisition date"] && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  (Event : Acquisition -{" "}
                  {formatDate(product.eventsMap["Acquisition date"] as number)})
                </Typography>
              )}
              <Timeline>
                {Object.entries(product.eventsMap).map(([eventKey], index) => {
                  return (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent
                        align="right"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatDate(product.eventsMap[eventKey] as number)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="secondary"></TimelineDot>
                        {index < Object.keys(product.eventsMap).length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{eventKey}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
              {/* New section: display all attributes */}
              <Box sx={{ mt: 2, textAlign: "left", width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Caractéristiques
                </Typography>
                <Grid2 container spacing={1}>
                  {Object.entries(product.attributesMap).map(
                    ([attr, value]) => (
                      <React.Fragment key={attr}>
                        <Grid2 size={{ xs: 4 }}>
                          <Typography variant="body2" fontWeight="bold">
                            {attr}
                          </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 8 }}>
                          <Typography variant="body2">{value}</Typography>
                        </Grid2>
                      </React.Fragment>
                    ),
                  )}
                </Grid2>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
