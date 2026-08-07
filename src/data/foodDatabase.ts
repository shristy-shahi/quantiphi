export interface MockFood {
  name: string;
  image: string; // URL or placeholder representation
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatsPer100g: number;
}

export const FOOD_DATABASE: MockFood[] = [
  {
    name: 'Apple',
    image: '🍎',
    caloriesPer100g: 52,
    proteinPer100g: 0.3,
    carbsPer100g: 14,
    fatsPer100g: 0.2,
  },
  {
    name: 'Banana',
    image: '🍌',
    caloriesPer100g: 89,
    proteinPer100g: 1.1,
    carbsPer100g: 23,
    fatsPer100g: 0.3,
  },
  {
    name: 'Chicken Breast',
    image: '🍗',
    caloriesPer100g: 165,
    proteinPer100g: 31,
    carbsPer100g: 0,
    fatsPer100g: 3.6,
  },
  {
    name: 'Oats',
    image: '🥣',
    caloriesPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatsPer100g: 6.9,
  },
  {
    name: 'Paneer',
    image: '🧀',
    caloriesPer100g: 265,
    proteinPer100g: 18.3,
    carbsPer100g: 1.2,
    fatsPer100g: 20.8,
  },
  {
    name: 'Rice',
    image: '🍚',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28,
    fatsPer100g: 0.3,
  },
];
