import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import BuildIcon from "@mui/icons-material/Build";
import WarningIcon from "@mui/icons-material/Warning";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

interface ProductCardProps {
  image: string;
  alt: string;
  name: string;
  event: string;
  benefit: string;
  date: string;
  benefitIcon: React.ReactNode;
}

export default function ProductCard({
  image,
  alt,
  name,
  event,
  benefit,
  date,
  benefitIcon,
}: ProductCardProps) {
  const getEventIcon = (event: string) => {
    if (event.includes("Maintenance")) {
      return <BuildIcon />;
    } else if (event.includes("Rappel")) {
      return <WarningIcon />;
    } else {
      return <TimelineDot />;
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            width: "100%",
            maxWidth: "200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: "1 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
            }}
          >
            <img
              src={image}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography>{name}</Typography>
            <Timeline>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    {getEventIcon(event)}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{event}</TimelineContent>
              </TimelineItem>
            </Timeline>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              <Chip icon={benefitIcon} label={benefit} color="primary" />
            </Box>
            <Button variant="contained" sx={{ mt: 2 }}>
              Voir les détails
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
