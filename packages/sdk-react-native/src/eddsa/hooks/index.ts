import { useContext } from "react";
import { KeybanEddsaReactContext } from "~/eddsa";

export const useKeybanEddsa = () => {
  const context = useContext(KeybanEddsaReactContext);

  if (!context) {
    throw new Error("useKeyban hook must be used inside KeybanProvider");
  }

  return context;
};
