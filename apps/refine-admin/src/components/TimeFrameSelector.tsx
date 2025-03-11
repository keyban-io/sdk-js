import { useTimeFrame } from "../hooks/useTimeFrame";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

// ...existing code or imports if necessary...
const TimeFrameSelector: React.FC = () => {
  const { timeFrame, setTimeFrame } = useTimeFrame();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: "days" | "weeks" | "months" | "years" | "overall" | null,
  ) => {
    if (newAlignment !== null) {
      setTimeFrame(newAlignment);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        bgcolor: "background.default",
        pt: 2,
        pb: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ToggleButtonGroup
        value={timeFrame}
        exclusive
        onChange={handleChange}
        sx={{
          boxShadow: 3,
          borderRadius: 4,
          padding: 0.5,
          bgcolor: "background.paper",
        }}
      >
        <ToggleButton
          value="days"
          sx={{
            borderRadius: 3,
            px: 2,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "secondary.main" },
            },
          }}
        >
          Days
        </ToggleButton>
        <ToggleButton
          value="weeks"
          sx={{
            borderRadius: 3,
            px: 2,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "secondary.main" },
            },
          }}
        >
          Weeks
        </ToggleButton>
        <ToggleButton
          value="months"
          sx={{
            borderRadius: 3,
            px: 2,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "secondary.main" },
            },
          }}
        >
          Months
        </ToggleButton>
        <ToggleButton
          value="years"
          sx={{
            borderRadius: 3,
            px: 2,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "secondary.main" },
            },
          }}
        >
          Years
        </ToggleButton>
        <ToggleButton
          value="overall"
          sx={{
            borderRadius: 3,
            px: 2,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
              "&:hover": { bgcolor: "secondary.main" },
            },
          }}
        >
          Overall
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TimeFrameSelector;
