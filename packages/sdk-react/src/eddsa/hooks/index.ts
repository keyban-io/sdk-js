import { useContext } from 'react';
import { KeybanEddsaReactContext } from '~/eddsa/provider/provider';

export const useKeybanEddsa = () => {
  const context = useContext(KeybanEddsaReactContext);

  if (!context) {
    throw new Error('useKeybanEddsa hook must be used inside KeybanProvider');
  }

  return context;
};
