import { FitnessGoal, DailyTargets } from '../types/nutrition';

export const GOAL_TARGETS: Record<FitnessGoal, DailyTargets> = {
  'Weight Loss': {
    calories: 1800,
    protein: 140,
    carbs: 180,
    fats: 60,
  },
  'Maintenance': {
    calories: 2200,
    protein: 150,
    carbs: 250,
    fats: 70,
  },
  'Muscle Gain': {
    calories: 2800,
    protein: 180,
    carbs: 320,
    fats: 80,
  },
};

export const DEFAULT_GOAL: FitnessGoal = 'Maintenance';
