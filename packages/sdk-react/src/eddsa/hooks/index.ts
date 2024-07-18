import { useContext } from 'react';
import { KeybanEddsaReactContext } from '~/eddsa/provider/provider';

/**
 * Custom hook to access the KeybanEddsaReactContext.
 *
 * This hook provides access to the EdDSA client context. It must be used within a KeybanProvider.
 *
 * @returns The context value from KeybanEddsaReactContext.
 * @throws Error if the hook is used outside of a KeybanProvider.
 */
export const useKeybanEddsa = () => {
  const context = useContext(KeybanEddsaReactContext);

  if (!context) {
    throw new Error('useKeybanEddsa hook must be used inside KeybanProvider');
  }

  return context;
};
