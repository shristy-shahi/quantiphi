# AGENTS.md

# AI Agent Guidelines

## Purpose

This document defines the rules and expectations for AI coding assistants contributing to the **Calorie Tracker & Macro Dashboard** project.

Every AI-generated change must preserve code quality, maintainability, accessibility, and consistency.

---

# Project Goal

Build a responsive nutrition tracking application where users can:

- Log meals manually
- Simulate AI image food detection
- Track calories and macronutrients
- Switch between fitness goals
- View live dashboard updates
- Delete meals
- Receive warnings when calorie limits are exceeded

The application should feel fast, intuitive, and production-ready.

---

# Core Principles

AI agents must follow these principles:

1. Single Responsibility Principle (SRP)
2. DRY (Don't Repeat Yourself)
3. KISS (Keep It Simple)
4. Strong TypeScript typing
5. Accessibility first
6. Responsive design
7. Reusable components
8. Immutable state updates
9. Clean code over clever code
10. Predictable state management

---

# Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Context API
- useReducer
- Vitest
- React Testing Library

Do not introduce additional frameworks without explicit approval.

---

# Folder Responsibilities

## components/

Contains reusable UI components only.

Do not place business logic inside components.

---

## context/

Contains:

- Global state
- Reducers
- Actions
- Providers

All shared state changes must go through the reducer.

---

## utils/

Contains pure functions.

Examples:

- Nutrition calculations
- Percentage calculations
- Validation helpers

Never include React hooks here.

---

## data/

Contains mock food database.

No UI logic.

No reducer logic.

---

## hooks/

Contains reusable custom hooks only.

Example:

```ts
useNutrition()
```

---

## types/

Contains all TypeScript interfaces, enums, and shared types.

Avoid duplicate interfaces across files.

---

# Coding Standards

## Components

Prefer functional components.

✅ Good

```tsx
const MealCard = () => {}
```

Avoid class components.

---

## Functions

Keep functions small.

A function should perform one task.

If a function exceeds roughly 40 lines, consider splitting it.

---

## Variable Names

Use descriptive names.

Good

```ts
totalCalories
remainingCalories
selectedGoal
proteinTarget
```

Avoid

```ts
x
temp
value
```

---

## Boolean Variables

Always use meaningful names.

Good

```ts
isExceeded
isLoading
hasMeals
```

Bad

```ts
flag
status
check
```

---

# State Management Rules

Only reducers may modify global state.

Never mutate state directly.

Correct

```ts
return {
  ...state,
  meals: [...state.meals, newMeal]
}
```

Incorrect

```ts
state.meals.push(newMeal)
```

---

# Nutrition Rules

All calculations belong in:

```text
utils/calculator.ts
```

Never duplicate calculation logic inside components.

Formula

```text
Scaled Value =
(Base Value × Grams) / 100
```

---

# Fitness Goal Rules

Changing the fitness goal:

✔ Updates targets

✔ Recalculates percentages

✔ Preserves meal history

Never delete meals when switching goals.

---

# Image Upload Rules

Current implementation is mocked.

AI agents should:

- Select a predefined food item
- Autofill the form
- Allow user confirmation

Do not implement real AI APIs unless requested.

---

# UI Guidelines

Design priorities:

- Clean
- Minimal
- Responsive
- Accessible
- Fast

Avoid unnecessary animations.

---

# Progress Bar Rules

Normal

Green or Blue

Exceeded

Crimson Red

Progress bars should animate smoothly.

---

# Modal Rules

Warning modal appears only when:

```text
Calories Consumed >
Daily Target
```

Closing the modal must not modify data.

---

# Error Handling

Always validate:

- Empty food name
- Weight <= 0
- Invalid numbers
- Missing targets

Display user-friendly error messages.

Never crash the application.

---

# Performance Guidelines

Use:

- React.memo
- useMemo
- useCallback

Avoid expensive recalculations on every render.

---

# Accessibility Requirements

Every interactive element must include:

- Keyboard support
- ARIA labels
- Visible focus states

Color should never be the only indicator of state.

---

# Testing Expectations

Every feature should include tests where appropriate.

Priority areas:

- Calculator
- Reducer
- Goal switching
- Progress calculation
- Meal deletion
- Warning modal behavior

---

# Git Commit Style

Use Conventional Commits.

Examples

```text
feat: add meal logging

fix: correct calorie calculation

refactor: simplify nutrition reducer

test: add reducer unit tests

docs: update architecture documentation
```

---

# Pull Request Checklist

Before submitting changes, verify:

- Code builds successfully
- No TypeScript errors
- No ESLint warnings
- Tests pass
- Responsive layout works
- Accessibility maintained
- Documentation updated if needed

---

# Things to Avoid

Do **not**:

- Duplicate calculation logic
- Mutate state
- Use `any` in TypeScript
- Create overly large components
- Mix UI with business logic
- Introduce unnecessary dependencies
- Hardcode nutritional values outside the data layer

---

# Future Expansion

Design new features to support:

- Backend APIs
- User authentication
- Cloud synchronization
- Barcode scanning
- AI food recognition
- Weekly analytics
- Mobile applications

New code should be modular and extensible.

---

# AI Agent Workflow

When implementing a new feature:

1. Understand the requirement.
2. Identify affected components.
3. Update shared types if necessary.
4. Implement business logic in `utils/` or `context/`.
5. Build reusable UI components.
6. Write or update tests.
7. Verify responsiveness and accessibility.
8. Update documentation when behavior changes.

Following these guidelines ensures that every AI contribution remains consistent, maintainable, and aligned with the project's architecture and long-term goals.