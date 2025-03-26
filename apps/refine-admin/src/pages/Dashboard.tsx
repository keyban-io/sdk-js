import { Box, Button, Stack } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import Grid2 from "@mui/material/Grid2";
import TimeFrameSelector from "../components/TimeFrameSelector/TimeFrameSelector";
import { UsersChart } from "../components/UsersChart";
import { TPPsChart } from "../components/TPPsChart";
import { TotalTPPCount } from "../components/TotalTPPCount"; // Ajout de l'import du composant TPPCountnt
import { TotalUsers } from "../components/TotalUsers"; // Ajout de l'import du composant TPPCount
import { TPPsDisplayed } from "../components/TPPsDisplayed"; // Ajout de l'import du composant TPPsDisplayed
import { TPPsPerUser } from "../components/TPPsPerUser";
import { TimeFrameProvider } from "../components/TimeFrameSelector/TimeFrameProvider";

export default function Dashboard() {
  return (
    <TimeFrameProvider>
      <Box>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            bgcolor: "background.default",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TimeFrameSelector />
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="text"
              startIcon={<ShareIcon />}
              sx={{ borderRadius: 2 }}
            >
              Share
            </Button>
            <Button
              size="small"
              variant="text"
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 2 }}
            >
              Download
            </Button>
          </Stack>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <UsersChart />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TotalUsers />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TPPsChart />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TotalTPPCount />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TPPsDisplayed />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TPPsPerUser />
          </Grid2>
        </Grid2>
      </Box>
    </TimeFrameProvider>
  );
}
