import { createContext } from "react";
import { TimeFrame } from "./TimeFrameSelector";


export const TimeFrameContext = createContext<{
  timeFrame: TimeFrame;
  setTimeFrame: (tf: TimeFrame) => void;
  period: string;
  setPeriod: (p: string) => void;
} | undefined>(undefined);
