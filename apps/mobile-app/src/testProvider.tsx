import { type ReactNode, createContext, useState } from 'react';

export const TestContext = createContext<{
  value: string;
  setVal: (val: string) => void;
} | null>(null);

export const Providerr = (props: { children: ReactNode }) => {
  const [state, setState] = useState<string>('');
  return (
    <TestContext.Provider
      value={{
        value: state,
        setVal: setState,
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};
