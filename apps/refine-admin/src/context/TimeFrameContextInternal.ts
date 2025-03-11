import { createContext } from "react";
import { TimeFrame } from "./TimeFrameContext";

interface TimeFrameContextProps {
  timeFrame: TimeFrame;
  setTimeFrame: (tf: TimeFrame) => void;
}

export const TimeFrameContextInternal = createContext<TimeFrameContextProps | undefined>(undefined);
