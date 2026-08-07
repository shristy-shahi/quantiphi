import { useContext } from 'react';
import { NutritionContext } from '../context/NutritionContext';
import type { NutritionContextProps } from '../context/NutritionContext';

export const useNutrition = (): NutritionContextProps => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
