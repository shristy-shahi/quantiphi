import { describe, it, expect } from 'vitest';
import { scaleNutrient, calculateTotals } from '../utils/calculator';
import type { FoodItem } from '../types/nutrition';

describe('Nutrition Calculator Core', () => {
  describe('scaleNutrient', () => {
    it('scales nutrients correctly based on weight (grams)', () => {
      // (165 * 200) / 100 = 330
      expect(scaleNutrient(165, 200)).toBe(330);
      
      // (31 * 150) / 100 = 46.5
      expect(scaleNutrient(31, 150)).toBe(46.5);

      // (52 * 50) / 100 = 26
      expect(scaleNutrient(52, 50)).toBe(26);
    });

    it('returns 0 when grams is 0 or negative', () => {
      expect(scaleNutrient(100, 0)).toBe(0);
      expect(scaleNutrient(100, -50)).toBe(0);
    });

    it('rounds values to one decimal place', () => {
      // (1.1 * 125) / 100 = 1.375 -> rounded to 1.4
      expect(scaleNutrient(1.1, 125)).toBe(1.4);
    });
  });

  describe('calculateTotals', () => {
    it('sums up nutrients for a list of food items', () => {
      const meals: FoodItem[] = [
        {
          id: '1',
          name: 'Apple',
          grams: 150,
          calories: 78,
          protein: 0.5,
          carbs: 21,
          fats: 0.3,
        },
        {
          id: '2',
          name: 'Chicken Breast',
          grams: 200,
          calories: 330,
          protein: 62,
          carbs: 0,
          fats: 7.2,
        },
      ];

      const totals = calculateTotals(meals);
      expect(totals.calories).toBe(408);
      expect(totals.protein).toBe(62.5);
      expect(totals.carbs).toBe(21);
      expect(totals.fats).toBe(7.5);
    });

    it('returns all zeros for an empty list of meals', () => {
      const totals = calculateTotals([]);
      expect(totals.calories).toBe(0);
      expect(totals.protein).toBe(0);
      expect(totals.carbs).toBe(0);
      expect(totals.fats).toBe(0);
    });
  });
});
