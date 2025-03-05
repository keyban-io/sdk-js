import { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

// ...existing code or imports if necessary...
const TimeFrameSelector: React.FC = () => {
  const [alignment, setAlignment] = useState("week");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
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
        value={alignment}
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
          value="week"
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
          Week
        </ToggleButton>
        <ToggleButton
          value="month"
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
          Month
        </ToggleButton>
        <ToggleButton
          value="semester"
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
          Semester
        </ToggleButton>
        <ToggleButton
          value="year"
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
          Year
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TimeFrameSelector;
