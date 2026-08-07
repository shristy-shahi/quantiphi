import React, { useReducer, useEffect } from 'react';
import { NutritionContext } from './NutritionContext';
import { nutritionReducer, initialNutritionState } from './NutritionReducer';

// Key for local storage persistence if needed, but lets just use memory state first
// to keep it simple and clean as per rules.
export const NutritionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(nutritionReducer, initialNutritionState());

  return (
    <NutritionContext.Provider value={{ state, dispatch }}>
      {children}
    </NutritionContext.Provider>
  );
};
