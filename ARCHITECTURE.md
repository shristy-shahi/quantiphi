# ARCHITECTURE.md

# Calorie Tracker & Macro Dashboard - System Architecture

## 1. Overview

The **Calorie Tracker & Macro Dashboard** follows a modular, component-based architecture using **React + TypeScript**. The application is designed to keep UI components reusable, business logic centralized, and state predictable.

### Architecture Goals

- Modular and scalable
- Separation of concerns
- Reusable UI components
- Centralized state management
- Real-time calculations
- Easy API integration in the future

---

# 2. High-Level Architecture

```text
                 User
                   │
                   ▼
          React UI Components
                   │
                   ▼
         Context + useReducer
                   │
                   ▼
        Nutrition Calculation Engine
                   │
                   ▼
        Dashboard & Meal History
```

The UI never performs calculations directly. All calculations pass through the Nutrition Engine.

---

# 3. Project Folder Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Dashboard/
│   │   ├── CalorieProgress.tsx
│   │   ├── MacroProgress.tsx
│   │   └── GoalToggle.tsx
│   │
│   ├── Meal/
│   │   ├── MealForm.tsx
│   │   ├── MealCard.tsx
│   │   └── MealList.tsx
│   │
│   ├── Modal/
│   │   └── WarningModal.tsx
│   │
│   └── Common/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ProgressBar.tsx
│
├── context/
│   ├── NutritionContext.tsx
│   ├── NutritionReducer.ts
│   └── NutritionProvider.tsx
│
├── data/
│   └── foodDatabase.ts
│
├── hooks/
│   └── useNutrition.ts
│
├── utils/
│   ├── calculator.ts
│   ├── helpers.ts
│   └── constants.ts
│
├── types/
│   └── nutrition.ts
│
├── App.tsx
└── main.tsx
```

---

# 4. Component Hierarchy

```text
App

├── GoalToggle
├── Dashboard
│     ├── CalorieProgress
│     ├── ProteinProgress
│     ├── CarbProgress
│     └── FatProgress
│
├── MealForm
│
├── MealList
│      ├── MealCard
│      ├── MealCard
│      └── MealCard
│
└── WarningModal
```

Each component has a single responsibility.

---

# 5. Data Models

## Food Item

```ts
interface FoodItem {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
```

---

## Nutrition Totals

```ts
interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}
```

---

## Fitness Goal

```ts
type FitnessGoal =
  | "Weight Loss"
  | "Maintenance"
  | "Muscle Gain";
```

---

# 6. State Management

The application uses:

- React Context API
- useReducer

### Global State

```ts
{
    meals: [],
    totals: {},
    goal: "Maintenance",
    targets: {},
    exceeded: false
}
```

This state is shared across all components.

---

# 7. Nutrition Calculation Engine

All nutrient calculations are centralized.

Formula:

```text
Scaled Value =
(Base Nutrient × User Grams) / 100
```

Example:

Food:

```text
Chicken Breast

Calories = 165

Protein = 31g
```

User enters

```text
200g
```

Output

```text
Calories = 330

Protein = 62g
```

No component performs this calculation.

Only:

```
utils/calculator.ts
```

---

# 8. Goal Targets

Weight Loss

```text
Calories 1800

Protein 140g

Carbs 180g

Fat 60g
```

Maintenance

```text
Calories 2200

Protein 150g

Carbs 250g

Fat 70g
```

Muscle Gain

```text
Calories 2800

Protein 180g

Carbs 320g

Fat 80g
```

Changing the goal updates targets only.

Meals remain unchanged.

---

# 9. Application Flow

## Add Meal

```text
User

↓

Meal Form

↓

Validation

↓

Calculator

↓

Reducer

↓

Update Totals

↓

Refresh Dashboard

↓

Refresh Meal List
```

---

## Delete Meal

```text
User

↓

Delete Button

↓

Reducer

↓

Remove Meal

↓

Recalculate Totals

↓

Refresh Dashboard
```

---

## Change Goal

```text
User

↓

Goal Toggle

↓

Reducer

↓

Load New Targets

↓

Recalculate Progress %

↓

Update Dashboard
```

Meals are preserved.

---

# 10. Warning System

Logic

```text
IF

Consumed Calories >

Daily Target

THEN

Warning = TRUE
```

Effects

- Progress bar becomes red
- Warning modal opens
- Remaining calories become negative

---

# 11. Mock Image Upload

Current version:

```text
Image Upload

↓

Random Food

↓

Autofill Inputs

↓

User Confirms

↓

Add Meal
```

Example mock foods

- Apple
- Banana
- Rice
- Chicken Breast
- Oats
- Paneer

Future versions can replace this with a real AI Vision API.

---

# 12. Progress Bar Logic

Percentage formula

```text
(Current Total / Target) × 100
```

If percentage exceeds 100

```text
Display = 100%

Color = Crimson
```

---

# 13. Error Handling

Validation Rules

- Food name required
- Weight must be greater than 0
- No negative values
- Ignore invalid image upload
- Prevent duplicate IDs

---

# 14. Performance Considerations

- Memoize expensive calculations
- Avoid unnecessary re-renders
- Use React.memo for display components
- Use useMemo for totals
- Use useCallback for event handlers

---

# 15. Accessibility

- Keyboard navigation
- ARIA labels
- Focus management
- High contrast colors
- Screen-reader friendly controls

---

# 16. Future Backend Integration

Current Architecture

```text
React

↓

Local State
```

Future Architecture

```text
React

↓

REST API / GraphQL

↓

Authentication

↓

Backend

↓

Database
```

Possible Backend

- Node.js + Express
- NestJS
- Spring Boot

Database

- PostgreSQL
- MongoDB
- Firebase

Authentication

- Clerk
- Firebase Auth
- Auth0
- JWT

---

# 17. Scalability Roadmap

Planned enhancements:

- User accounts
- Cloud synchronization
- Weekly analytics
- Monthly reports
- AI-powered food recognition
- Barcode scanner
- Nutrition recommendations
- Wearable device integration
- Offline mode with synchronization
- Mobile application (React Native)

---

# 18. Architecture Principles

- Single Responsibility Principle (SRP)
- Reusable Components
- Predictable State Management
- Separation of UI and Business Logic
- Immutable State Updates
- Type Safety with TypeScript
- Responsive Design
- Accessibility First
- Performance Optimization
- Future Backend Compatibility

This architecture is designed to support both the current frontend prototype and future expansion into a production-grade health tracking platform.