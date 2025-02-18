import { Container, Typography, Box, Card, CardContent } from "@mui/material";
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
import Tooltip from "@mui/material/Tooltip";
import EuroIcon from "@mui/icons-material/Euro";
import IconButton from "@mui/material/IconButton";
import productBosch from "../assets/Four_integrable_multifonction_Bosch_HBA171BS4F.json";
import productSmeg from "../assets/Grille_pain_Smeg_TSF01_2_fentes_Toaster_Noir.json";
import productSamsung from "../assets/Lave_linge_hublot_Samsung_Ecobubble_WW80CGC04DTH_8kg_Blanc.json";
import productLG from "../assets/Refrigerateur_combine_LG_GBV3100DEP_Noir.json";
import productLGTV from "../assets/TV_OLED_Evo_LG_OLED55C4_139cm_4K_UHD_Smart_TV_2024_Noir_et_Brun.json";
import { mapAttributes } from "../utils/attributes";
import { mapEvents } from "../utils/events";

const products = [
  // Consolidated product data from JSON files
  productBosch,
  productSmeg,
  productSamsung,
  productLG,
  productLGTV,
];

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <Typography variant="h6">Produit non trouvé</Typography>;
  }

  // Mappe les attributs et les events pour un accès simplifié
  const attrs = mapAttributes(product.attributes || []);
  const eventsMap = mapEvents(product.events || []);
  console.log("eventsMap", eventsMap);
  console.log("typeof eventsMap", typeof eventsMap);

  const acquisitionDate = attrs["Acquisition date"];
  const acquisitionEvent = eventsMap["Acquisition date"];

  // Format date to be human-readable; input is a timestamp (in seconds)
  const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
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
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {attrs["Status"]}
              </Typography>
              {attrs["Ownership status"] && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {attrs["Ownership status"]}
                </Typography>
              )}
              {acquisitionDate && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Date d’acquisition : {formatDate(acquisitionDate)}
                </Typography>
              )}
              {acquisitionEvent && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  (Event : Acquisition - {formatDate(acquisitionDate)})
                </Typography>
              )}
              <Timeline>
                {Object.entries(eventsMap).map(([eventKey], index) => {
                  return (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent
                        sx={{ py: "20px" }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                      >
                        {formatDate(eventsMap[eventKey])}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="secondary"></TimelineDot>
                        {index < Object.keys(eventsMap).length - 1 && (
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
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
