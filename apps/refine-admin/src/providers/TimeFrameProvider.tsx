import React, { useState } from "react";
import { TimeFrame } from "../context/TimeFrameContext";
import { TimeFrameContextInternal } from "../context/TimeFrameContextInternal";

export const TimeFrameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("weeks");

  return (
    <TimeFrameContextInternal.Provider value={{ timeFrame, setTimeFrame }}>
      {children}
    </TimeFrameContextInternal.Provider>
  );
};
