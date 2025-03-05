import { RevenuesChart } from "../components/RevenuesChart";
import { RevenueSourcesPie } from "../components/RevenueSourcesPie";
import { RevenueKPIs } from "../components/RevenueKPIs";
import { DetailedReport } from "../components/DetailedReport";
import { Grid2, Box } from "@mui/material";
import TimeFrameSelector from "../components/TimeFrameSelector";

export default function Dashboard() {
  return (
    <Box>
      <TimeFrameSelector />
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
  );
}
