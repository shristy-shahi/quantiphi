export interface MockFood {
  name: string;
  image: string;
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
  {
    name: 'Egg',
    image: '🥚',
    caloriesPer100g: 155,
    proteinPer100g: 13,
    carbsPer100g: 1.1,
    fatsPer100g: 11,
  },
  {
    name: 'Salmon',
    image: '🐟',
    caloriesPer100g: 208,
    proteinPer100g: 20,
    carbsPer100g: 0,
    fatsPer100g: 13,
  },
  {
    name: 'Sweet Potato',
    image: '🍠',
    caloriesPer100g: 86,
    proteinPer100g: 1.6,
    carbsPer100g: 20,
    fatsPer100g: 0.1,
  },
  {
    name: 'Greek Yogurt',
    image: '🥛',
    caloriesPer100g: 59,
    proteinPer100g: 10,
    carbsPer100g: 3.6,
    fatsPer100g: 0.7,
  },
  {
    name: 'Almonds',
    image: '🌰',
    caloriesPer100g: 579,
    proteinPer100g: 21,
    carbsPer100g: 22,
    fatsPer100g: 49,
  },
  {
    name: 'Broccoli',
    image: '🥦',
    caloriesPer100g: 34,
    proteinPer100g: 2.8,
    carbsPer100g: 7,
    fatsPer100g: 0.4,
  },
];
