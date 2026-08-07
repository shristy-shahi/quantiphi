import { describe, it, expect } from 'vitest';
import { nutritionReducer, initialNutritionState } from '../context/NutritionReducer';
import type { NutritionState, FoodItem } from '../types/nutrition';

describe('Nutrition Reducer', () => {
  it('returns initial state with default targets for Maintenance', () => {
    const state = initialNutritionState();
    expect(state.goal).toBe('Maintenance');
    expect(state.meals).toEqual([]);
    expect(state.totals.calories).toBe(0);
    expect(state.targets.calories).toBe(2200);
    expect(state.exceeded).toBe(false);
    expect(state.warningDismissed).toBe(false);
  });

  it('handles ADD_MEAL action and updates totals', () => {
    const initialState = initialNutritionState();
    const action = {
      type: 'ADD_MEAL' as const,
      payload: {
        id: 'test-meal-1',
        name: 'Rice',
        grams: 200,
        calories: 260,
        protein: 5.4,
        carbs: 56,
        fats: 0.6,
      },
    };

    const state = nutritionReducer(initialState, action);

    expect(state.meals.length).toBe(1);
    expect(state.meals[0].name).toBe('Rice');
    expect(state.totals.calories).toBe(260);
    expect(state.totals.protein).toBe(5.4);
    expect(state.totals.carbs).toBe(56);
    expect(state.totals.fats).toBe(0.6);
    expect(state.exceeded).toBe(false);
  });

  it('triggers exceeded flag when calories consume exceeds target', () => {
    const initialState = initialNutritionState('Weight Loss'); // Target is 1800
    const action = {
      type: 'ADD_MEAL' as const,
      payload: {
        id: 'heavy-meal',
        name: 'Massive Payload',
        grams: 1000,
        calories: 1900,
        protein: 100,
        carbs: 200,
        fats: 80,
      },
    };

    const state = nutritionReducer(initialState, action);
    expect(state.totals.calories).toBe(1900);
    expect(state.exceeded).toBe(true);
    expect(state.warningDismissed).toBe(false);
  });

  it('handles DELETE_MEAL action and updates totals', () => {
    // Set up state with two meals
    const meal1: FoodItem = {
      id: 'm1',
      name: 'Oats',
      grams: 100,
      calories: 389,
      protein: 16.9,
      carbs: 66.3,
      fats: 6.9,
    };
    const meal2: FoodItem = {
      id: 'm2',
      name: 'Paneer',
      grams: 100,
      calories: 265,
      protein: 18.3,
      carbs: 1.2,
      fats: 20.8,
    };

    let state: NutritionState = {
      meals: [meal1, meal2],
      totals: { calories: 654, protein: 35.2, carbs: 67.5, fats: 27.7 },
      goal: 'Weight Loss',
      targets: { calories: 1800, protein: 140, carbs: 180, fats: 60 },
      exceeded: false,
      warningDismissed: false,
    };

    // Delete meal2 (Paneer)
    const action = { type: 'DELETE_MEAL' as const, payload: 'm2' };
    state = nutritionReducer(state, action);

    expect(state.meals.length).toBe(1);
    expect(state.meals[0].id).toBe('m1');
    expect(state.totals.calories).toBe(389);
    expect(state.totals.protein).toBe(16.9);
    expect(state.totals.carbs).toBe(66.3);
    expect(state.totals.fats).toBe(6.9);
  });

  it('handles SET_GOAL action, updates targets, preserves meal history', () => {
    const meal: FoodItem = {
      id: 'm1',
      name: 'Chicken and Rice',
      grams: 400,
      calories: 900,
      protein: 70,
      carbs: 120,
      fats: 15,
    };

    let state: NutritionState = {
      meals: [meal],
      totals: { calories: 900, protein: 70, carbs: 120, fats: 15 },
      goal: 'Maintenance', // Calorie target 2200
      targets: { calories: 2200, protein: 150, carbs: 250, fats: 70 },
      exceeded: false,
      warningDismissed: false,
    };

    // Change goal to Weight Loss (Calorie target 1800)
    const action = { type: 'SET_GOAL' as const, payload: 'Weight Loss' as const };
    state = nutritionReducer(state, action);

    expect(state.goal).toBe('Weight Loss');
    expect(state.targets.calories).toBe(1800);
    expect(state.meals.length).toBe(1); // Meals preserved!
    expect(state.totals.calories).toBe(900);
    expect(state.exceeded).toBe(false);
  });

  it('handles CLOSE_WARNING action', () => {
    const state: NutritionState = {
      meals: [],
      totals: { calories: 2000, protein: 100, carbs: 200, fats: 50 },
      goal: 'Weight Loss',
      targets: { calories: 1800, protein: 140, carbs: 180, fats: 60 },
      exceeded: true,
      warningDismissed: false,
    };

    const action = { type: 'CLOSE_WARNING' as const };
    const updatedState = nutritionReducer(state, action);

    expect(updatedState.warningDismissed).toBe(true);
    expect(updatedState.exceeded).toBe(true); // Exceeded still remains true
  });

  it('handles CLEAR_MEALS action and resets nutrition values', () => {
    const state: NutritionState = {
      meals: [
        { id: '1', name: 'Meal 1', grams: 100, calories: 300, protein: 20, carbs: 30, fats: 10 }
      ],
      totals: { calories: 300, protein: 20, carbs: 30, fats: 10 },
      goal: 'Weight Loss',
      targets: { calories: 1800, protein: 140, carbs: 180, fats: 60 },
      exceeded: false,
      warningDismissed: false,
    };

    const action = { type: 'CLEAR_MEALS' as const };
    const updatedState = nutritionReducer(state, action);

    expect(updatedState.meals).toEqual([]);
    expect(updatedState.totals).toEqual({ calories: 0, protein: 0, carbs: 0, fats: 0 });
    expect(updatedState.exceeded).toBe(false);
    expect(updatedState.warningDismissed).toBe(false);
  });
});
