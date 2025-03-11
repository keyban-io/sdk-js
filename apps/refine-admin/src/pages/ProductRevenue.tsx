import { Box, Button, Stack } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import Grid2 from "@mui/material/Grid2";
import TimeFrameSelector from "../components/TimeFrameSelector";
import { RevenuesChart } from "../components/RevenuesChart";
import { RevenueSourcesPie } from "../components/RevenueSourcesPie";
import { RevenueKPIs } from "../components/RevenueKPIs";
import { DetailedReport } from "../components/DetailedReport";
import { TimeFrameProvider } from "../providers/TimeFrameProvider";

export default function ProductRevenue() {
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
              variant="contained"
              color="secondary"
              startIcon={<ShareIcon />}
              sx={{ borderRadius: 2 }}
            >
              Share
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 2 }}
            >
              Download
            </Button>
          </Stack>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <RevenuesChart />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <RevenueSourcesPie />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <RevenueKPIs />
          </Grid2>
        </Grid2>
        <Box mt={2}>
          <DetailedReport />
        </Box>
      </Box>
    </TimeFrameProvider>
  );
}
