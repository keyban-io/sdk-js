import React, { createContext, useContext, useState } from "react";

type SignerContextType = {
  signerType: string;
  setSignerType: React.Dispatch<React.SetStateAction<string>>;
};

const SignerContext = createContext<SignerContextType | undefined>(undefined);

export const SignerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signerType, setSignerType] = useState("eddsa");
  return (
    <SignerContext.Provider value={{ signerType, setSignerType }}>
      {children}
    </SignerContext.Provider>
  );
};

export const useSigner = (): SignerContextType => {
  const context = useContext(SignerContext);
  if (!context) {
    throw new Error("useSigner must be used within a SignerProvider");
  }
  return context;
};
