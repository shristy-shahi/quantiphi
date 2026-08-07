# CLAUDE.md

# Claude Code Project Instructions

## Project

**Calorie Tracker & Macro Dashboard**

---

# Project Overview

The Calorie Tracker & Macro Dashboard is a frontend-first health tracking application that allows users to monitor daily calorie intake and macronutrients in real time.

The project emphasizes:

- Clean UI
- Fast interactions
- Accurate nutrition calculations
- Responsive design
- Reusable components
- Strong TypeScript typing
- Maintainable architecture

The codebase should be written as if it will eventually become a production SaaS application.

---

# Primary Objective

Help users understand their nutrition through immediate visual feedback.

The application should always feel:

- Fast
- Simple
- Predictable
- Responsive

---

# Technology Stack

## Framework

- React 18+
- TypeScript
- Vite

## Styling

- Tailwind CSS

## State Management

- Context API
- useReducer

## Testing

- Vitest
- React Testing Library

---

# Architecture Rules

Always follow the architecture defined in:

```text
ARCHITECTURE.md
```

Do not invent a new architecture unless explicitly requested.

---

# Coding Philosophy

Prefer:

- Readability over cleverness
- Small reusable components
- Pure functions
- Immutable updates
- Predictable state
- Clear naming

Avoid unnecessary abstraction.

---

# Folder Responsibilities

## components/

Only reusable UI.

Business logic belongs elsewhere.

---

## utils/

Pure calculations only.

Examples:

- calorie calculation
- macro calculation
- percentage calculation

Never import React here.

---

## context/

Global application state.

All shared updates go through reducers.

---

## hooks/

Reusable hooks.

Avoid placing business logic directly inside components.

---

## types/

Every shared interface should exist only once.

Never duplicate types.

---

# Project Workflow

When implementing any feature:

1. Understand the requirement.
2. Update shared types.
3. Implement calculations.
4. Update reducer.
5. Build UI.
6. Connect state.
7. Test.
8. Refactor if needed.

---

# Component Design Rules

Each component should have one responsibility.

Example

Good

```text
MealForm
```

Bad

```text
MealFormDashboardProgressCalculatorModal
```

Split large components.

---

# State Rules

Global State

```ts
{
    meals,
    totals,
    targets,
    goal,
    exceeded
}
```

Local State

Use only for:

- input values
- modal visibility
- temporary UI state

Never duplicate global state locally.

---

# Nutrition Calculation Rules

Every nutrient calculation must be centralized.

Formula

```text
scaledValue =
(baseValue × grams) / 100
```

Never repeat this logic in multiple places.

---

# Goal Switching Rules

Changing goals must:

- Update targets
- Preserve meals
- Preserve totals
- Recalculate percentages
- Update dashboard

Changing the goal must never clear user data.

---

# Mock Image Upload

Current implementation is intentionally mocked.

Allowed behavior

- Pick predefined food
- Autofill inputs
- Let user edit
- Save normally

Do not integrate external AI services unless requested.

---

# UI Expectations

Dashboard should immediately reflect:

- added meals
- deleted meals
- changed goals

No manual refresh.

No page reload.

---

# Progress Bars

Main Bar

Represents calories.

Color

Normal

Green or Blue

Exceeded

Crimson

Macro bars

Protein

Carbs

Fat

Should update independently.

---

# Warning Modal

Display only when

```text
totalCalories >
calorieTarget
```

Closing the modal must not modify application state.

---

# Performance Guidelines

Prefer

React.memo

useMemo

useCallback

Avoid unnecessary renders.

Do not optimize prematurely, but avoid obvious inefficiencies.

---

# Accessibility

Every form element must include:

- labels
- keyboard navigation
- focus states
- ARIA attributes where appropriate

The application should be usable without a mouse.

---

# Error Handling

Validate

- empty names
- invalid weights
- NaN
- negative values

Display friendly validation messages.

Never allow runtime crashes because of invalid user input.

---

# Naming Conventions

Variables

Good

```ts
remainingCalories
proteinConsumed
dailyTarget
mealHistory
```

Avoid

```ts
a
b
temp
data
```

Components

Use PascalCase

```text
MealForm.tsx
```

Hooks

Use camelCase

```text
useNutrition.ts
```

Utility functions

Use camelCase

```text
calculateCalories.ts
```

---

# Code Quality Checklist

Before considering a task complete:

- TypeScript passes
- Build succeeds
- No duplicated logic
- No unused imports
- Components remain reusable
- Reducer remains predictable
- Documentation updated if behavior changes

---

# Future Features

The architecture should support future additions without major refactoring.

Examples:

- Authentication
- Cloud storage
- Nutrition API integration
- Barcode scanning
- AI image recognition
- Weekly reports
- Charts
- Mobile support
- Offline synchronization

---

# Development Priorities

Always prioritize work in this order:

1. Correctness
2. User experience
3. Readability
4. Maintainability
5. Performance
6. Scalability

---

# AI Assistant Behavior

When making changes:

- Respect existing architecture.
- Reuse existing components before creating new ones.
- Avoid introducing duplicate utilities.
- Keep functions focused and easy to test.
- Add comments only when they clarify non-obvious logic.
- If multiple implementation options exist, choose the simplest solution that satisfies the requirements.

---

# Final Principle

Every contribution should leave the codebase cleaner than it was found.

Favor consistency over novelty, and build with future maintainability in mind.