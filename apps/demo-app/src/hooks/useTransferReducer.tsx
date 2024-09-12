import {
  useReducer,
  useState,
} from 'react';

interface TransferState {
  isTransferring: boolean;
  isEstimatingFees: boolean;
  feeEstimate: string | null;
  transactionHash: string | null;
  error: string | null;
}

type TransferAction =
  | { type: "START_TRANSFER" }
  | { type: "TRANSFER_SUCCESS"; payload: string }
  | { type: "TRANSFER_FAIL"; payload: string }
  | { type: "START_FEE_ESTIMATION" }
  | { type: "FEE_ESTIMATION_SUCCESS"; payload: string }
  | { type: "FEE_ESTIMATION_FAIL"; payload: string }
  | { type: "RESET_FORM" };

const initialState: TransferState = {
  isTransferring: false,
  isEstimatingFees: false,
  feeEstimate: null,
  transactionHash: null,
  error: null,
};

function reducer(state: TransferState, action: TransferAction): TransferState {
  switch (action.type) {
    case "START_TRANSFER":
      return {
        ...state,
        isTransferring: true,
        error: null,
        transactionHash: null,
      };
    case "TRANSFER_SUCCESS":
      return {
        ...state,
        isTransferring: false,
        transactionHash: action.payload,
      };
    case "TRANSFER_FAIL":
      return { ...state, isTransferring: false, error: action.payload };
    case "START_FEE_ESTIMATION":
      return { ...state, isEstimatingFees: true };
    case "FEE_ESTIMATION_SUCCESS":
      return {
        ...state,
        isEstimatingFees: false,
        feeEstimate: action.payload,
      };
    case "FEE_ESTIMATION_FAIL":
      return {
        ...state,
        isEstimatingFees: false,
        feeEstimate: null,
        error: action.payload,
      };
    case "RESET_FORM":
      return initialState;
    default:
      throw new Error("Unhandled action type");
  }
}

export function useTransferReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

  const handleSuccess = (txHash: string) => {
    dispatch({ type: "TRANSFER_SUCCESS", payload: txHash });
    setTransactionHistory((prev) => [...prev, txHash]);
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return { state, dispatch, handleSuccess, resetForm, transactionHistory };
}
