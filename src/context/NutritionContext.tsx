import { createContext } from 'react';
import type { NutritionState, NutritionAction } from '../types/nutrition';

export interface NutritionContextProps {
  state: NutritionState;
  dispatch: React.Dispatch<NutritionAction>;
}

export const NutritionContext = createContext<NutritionContextProps | undefined>(undefined);
