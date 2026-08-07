export type FitnessGoal = 'Weight Loss' | 'Maintenance' | 'Muscle Gain';

export interface FoodItem {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutritionState {
  meals: FoodItem[];
  totals: NutritionTotals;
  goal: FitnessGoal;
  targets: DailyTargets;
  exceeded: boolean;
  warningDismissed: boolean;
}

export type NutritionAction =
  | { type: 'ADD_MEAL'; payload: Omit<FoodItem, 'id'> & { id?: string } }
  | { type: 'DELETE_MEAL'; payload: string }
  | { type: 'SET_GOAL'; payload: FitnessGoal }
  | { type: 'CLOSE_WARNING' };
