import { useContext } from "react";
import { TimeFrameContext } from "./TimeFrameContext";

export const useTimeFrame = () => {
  const context = useContext(TimeFrameContext);
  if (!context) {
    throw new Error("useTimeFrame must be used within a TimeFrameProvider");
  }
  return context;
};
