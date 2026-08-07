import { NutritionState, NutritionAction, FoodItem } from '../types/nutrition';
import { GOAL_TARGETS } from '../utils/constants';
import { calculateTotals } from '../utils/calculator';

export const initialNutritionState = (initialGoal = 'Maintenance' as const): NutritionState => {
  const targets = GOAL_TARGETS[initialGoal];
  return {
    meals: [],
    totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    goal: initialGoal,
    targets,
    exceeded: false,
    warningDismissed: false,
  };
};

export const nutritionReducer = (
  state: NutritionState,
  action: NutritionAction
): NutritionState => {
  switch (action.type) {
    case 'ADD_MEAL': {
      const newMeal: FoodItem = {
        id: action.payload.id || Math.random().toString(36).substring(2, 9),
        name: action.payload.name,
        grams: action.payload.grams,
        calories: action.payload.calories,
        protein: action.payload.protein,
        carbs: action.payload.carbs,
        fats: action.payload.fats,
      };

      const updatedMeals = [...state.meals, newMeal];
      const updatedTotals = calculateTotals(updatedMeals);
      const limitExceeded = updatedTotals.calories > state.targets.calories;

      return {
        ...state,
        meals: updatedMeals,
        totals: updatedTotals,
        // Trigger modal only if it transitions to exceeded and warning wasn't already dismissed
        exceeded: limitExceeded,
        warningDismissed: limitExceeded ? state.warningDismissed : false,
      };
    }

    case 'DELETE_MEAL': {
      const updatedMeals = state.meals.filter((meal) => meal.id !== action.payload);
      const updatedTotals = calculateTotals(updatedMeals);
      const limitExceeded = updatedTotals.calories > state.targets.calories;

      return {
        ...state,
        meals: updatedMeals,
        totals: updatedTotals,
        exceeded: limitExceeded,
        // Reset warning dismissed if we drop below target, so it can fire again next time we exceed
        warningDismissed: limitExceeded ? state.warningDismissed : false,
      };
    }

    case 'SET_GOAL': {
      const targetGoal = action.payload;
      const targetNutrition = GOAL_TARGETS[targetGoal];
      const limitExceeded = state.totals.calories > targetNutrition.calories;

      return {
        ...state,
        goal: targetGoal,
        targets: targetNutrition,
        exceeded: limitExceeded,
        // Reset warning state based on new target
        warningDismissed: limitExceeded ? state.warningDismissed : false,
      };
    }

    case 'CLOSE_WARNING': {
      return {
        ...state,
        warningDismissed: true,
      };
    }

    default:
      return state;
  }
};
