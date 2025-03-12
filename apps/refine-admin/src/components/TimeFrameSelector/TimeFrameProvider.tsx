import React, { useState, useEffect } from "react";
import { TimeFrame } from "./TimeFrameSelector";
import { TimeFrameContext } from "./TimeFrameContext";

export const TimeFrameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(
    (localStorage.getItem("timeFrame") as TimeFrame) || "days",
  );
  const [period, setPeriod] = useState<string>(
    localStorage.getItem("period") || "",
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side check
      const savedTimeFrame = localStorage.getItem("timeFrame");
      if (
        savedTimeFrame === "days" ||
        savedTimeFrame === "months" ||
        savedTimeFrame === "years"
      ) {
        setTimeFrame(savedTimeFrame);
      } else {
        localStorage.setItem("timeFrame", "days");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side check
      localStorage.setItem("timeFrame", timeFrame);
    }
  }, [timeFrame]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("period", period);
    }
  }, [period]);

  return (
    <TimeFrameContext.Provider
      value={{ timeFrame, setTimeFrame, period, setPeriod }}
    >
      {children}
    </TimeFrameContext.Provider>
  );
};
