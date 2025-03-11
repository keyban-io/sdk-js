import { useContext } from "react";
import { TimeFrameContextInternal } from "../context/TimeFrameContextInternal";

export const useTimeFrame = () => {
  const context = useContext(TimeFrameContextInternal);
  if (!context) {
    throw new Error("useTimeFrame must be used within a TimeFrameProvider");
  }
  return context;
};
