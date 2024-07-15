import { useContext } from 'react';
import { KeybanEcdsaReactContext } from '../provider';

/**
 * Custom hook to access the KeybanEddsaReactContext.
 *
 * This hook provides access to the EDDSA client context. It must be used within a KeybanProvider.
 *
 * @returns The context value from KeybanEddsaReactContext.
 * @throws Error if the hook is used outside of a KeybanProvider.
 */
export const useKeybanEcdsa = () => {
  const context = useContext(KeybanEcdsaReactContext);

  if (!context) {
    throw new Error(
      'useKeybanEcdsa hook must be used inside KeybanEcdsaProvider',
    );
  }

  return context;
};
