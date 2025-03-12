import React, { useCallback } from "react";
import { useTimeFrame } from "./useTimeFrame";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export type TimeFrame = "days" | "months" | "years";

const timeFrames: TimeFrame[] = ["days", "months", "years"];

const commonButtonStyle = {
  borderRadius: 3,
  px: 2,
  textTransform: "none",
  "&.Mui-selected": {
    bgcolor: "secondary.main",
    color: "primary.contrastText",
    "&:hover": { bgcolor: "secondary.main" },
  },
};

const TimeFrameSelector: React.FC = () => {
  const { timeFrame, setTimeFrame, period, setPeriod } = useTimeFrame();

  // Declare options and compute current month and year
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearOptions = ["2020", "2021", "2022", "2023", "2024", "2025"];
  const currentMonth = monthOptions[new Date().getMonth()];
  const currentYear = new Date().getFullYear().toString();

  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newAlignment: TimeFrame | null) => {
      if (newAlignment !== null) {
        setTimeFrame(newAlignment);
        if (newAlignment === "days") {
          setPeriod(currentMonth);
        } else if (newAlignment === "months") {
          setPeriod(currentYear);
        } else {
          setPeriod("");
        }
      }
    },
    [setTimeFrame, setPeriod, currentMonth, currentYear],
  );

  const handlePeriodChange = (event: SelectChangeEvent<string>) => {
    setPeriod(event.target.value as string);
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {/* Timeframe toggle */}
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
          {timeFrames.map((option) => (
            <ToggleButton
              key={option}
              value={option}
              sx={commonButtonStyle}
              aria-label={option}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {/* Secondary period selection */}
        {(timeFrame === "days" || timeFrame === "months") && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="period-select-label">
              {timeFrame === "days" ? "Select Month" : "Select Year"}
            </InputLabel>
            <Select
              labelId="period-select-label"
              value={period}
              label={timeFrame === "days" ? "Select Month" : "Select Year"}
              onChange={handlePeriodChange}
            >
              {(timeFrame === "days" ? monthOptions : yearOptions).map(
                (opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};

export default TimeFrameSelector;
