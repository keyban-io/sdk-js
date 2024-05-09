import { useContext } from "react";
import { KeybanEddsaContext } from "~/eddsa/provider";

export const useKeybanEddsa = () => {
  const context = useContext(KeybanEddsaContext);

  if (!context) {
    throw new Error("useKeyban hook must be used inside KeybanProvider");
  }

  return context;
};
