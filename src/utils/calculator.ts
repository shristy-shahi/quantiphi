import type { FoodItem, NutritionTotals } from '../types/nutrition';

/**
 * Scaled Value = (Base Value × Grams) / 100
 * Centralized scaling calculation as required by ARCHITECTURE.md and AGENTS.md.
 */
export const scaleNutrient = (baseValue: number, grams: number): number => {
  if (grams <= 0) return 0;
  const value = (baseValue * grams) / 100;
  // Round to 1 decimal place for precision, but keep it clean
  return Math.round(value * 10) / 10;
};

/**
 * Calculate the totals for all meals in the list
 */
export const calculateTotals = (meals: FoodItem[]): NutritionTotals => {
  return meals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fats += meal.fats;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
};
