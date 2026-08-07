# SKILLS.md

# Skills & Development Standards

## Project

**Calorie Tracker & Macro Dashboard**

---

# Purpose

This document defines the technical skills, coding standards, and best practices required to build and maintain this project. It serves as a reference for both human developers and AI coding assistants to ensure consistent, scalable, and high-quality contributions.

---

# Core Technologies

## Frontend

- React 18+
- TypeScript
- Vite
- Tailwind CSS

Required knowledge:

- Functional Components
- JSX/TSX
- Hooks
- Component composition
- Props and state
- Conditional rendering
- Lists and keys

---

# TypeScript

All code must be strongly typed.

## Required Skills

- Interfaces
- Type aliases
- Enums (when appropriate)
- Generics
- Utility types
- Strict null checking

### Good Example

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

### Avoid

```ts
const meal: any = {};
```

Never use `any` unless absolutely unavoidable.

---

# React Skills

Developers should understand:

- `useState`
- `useReducer`
- `useContext`
- `useEffect`
- `useMemo`
- `useCallback`
- `React.memo`

Build small, reusable components with a single responsibility.

---

# State Management

Global state is managed with **Context API + useReducer**.

State should contain:

- Meals
- Nutrition totals
- Fitness goal
- Daily targets
- Warning status

Rules:

- Never mutate state directly.
- Always dispatch actions through the reducer.
- Keep reducers pure.

---

# Nutrition Logic

All nutritional calculations must be centralized.

Formula:

```text
Scaled Value = (Base Value × Grams) / 100
```

Do not duplicate calculation logic inside UI components.

---

# Data Modeling

Use clear and reusable models.

Example entities:

- FoodItem
- NutritionTotals
- FitnessGoal
- DailyTargets

Keep interfaces in `src/types/`.

---

# Component Design

Every component should have a single responsibility.

Examples:

- GoalToggle
- MealForm
- MealCard
- MealList
- Dashboard
- ProgressBar
- WarningModal

Avoid creating components that handle multiple unrelated concerns.

---

# Folder Organization

Follow this structure:

```text
src/
├── components/
├── context/
├── hooks/
├── utils/
├── data/
├── types/
├── assets/
├── App.tsx
└── main.tsx
```

Each folder has a single purpose.

---

# Styling Standards

Use **Tailwind CSS**.

Guidelines:

- Mobile-first design
- Consistent spacing
- Responsive layouts
- Utility classes
- Minimal custom CSS

Avoid inline styles unless necessary.

---

# UI/UX Principles

The application should feel:

- Fast
- Clean
- Modern
- Responsive
- Accessible

Provide immediate visual feedback for user actions.

---

# Accessibility

Every interactive element must support:

- Keyboard navigation
- Visible focus states
- ARIA labels where required
- Screen reader compatibility

Do not rely on color alone to communicate important information.

---

# Performance

Optimize thoughtfully.

Recommended practices:

- `React.memo`
- `useMemo`
- `useCallback`
- Lazy loading when appropriate
- Avoid unnecessary re-renders

Do not optimize prematurely.

---

# Error Handling

Validate:

- Empty food names
- Invalid weights
- Negative values
- NaN inputs

Display friendly validation messages instead of crashing.

---

# Testing

Preferred tools:

- Vitest
- React Testing Library

Priority tests:

- Nutrition calculations
- Reducer logic
- Goal switching
- Meal deletion
- Progress bar calculations
- Warning modal behavior

---

# Git Skills

Follow Conventional Commits.

Examples:

```text
feat: add meal form
fix: correct calorie calculation
refactor: simplify dashboard logic
docs: update README
test: add reducer tests
```

Keep commits focused on a single logical change.

---

# Documentation

Keep documentation up to date.

Update documentation whenever:

- Architecture changes
- Folder structure changes
- Public APIs change
- User workflows change

Documentation is part of the project, not an afterthought.

---

# AI Collaboration

When using AI coding assistants:

- Read `README.md`
- Read `ARCHITECTURE.md`
- Follow `AGENTS.md`
- Respect existing patterns
- Reuse utilities before creating new ones
- Avoid introducing duplicate logic

AI-generated code should be reviewed like human-written code.

---

# Code Quality Checklist

Before submitting changes, verify:

- No TypeScript errors
- No ESLint warnings
- No duplicated logic
- Components are reusable
- Reducers remain pure
- Tests pass
- Documentation updated if needed

---

# Future Skills

The architecture should support future enhancements such as:

- Backend integration (REST/GraphQL)
- User authentication
- Cloud synchronization
- AI food recognition
- Barcode scanning
- Nutrition APIs
- Offline support
- Mobile applications
- Analytics dashboards

Design new code with extensibility in mind.

---

# Development Principles

Every contribution should follow these principles:

1. Simplicity over complexity.
2. Readability over cleverness.
3. Reuse over duplication.
4. Strong typing over weak typing.
5. Accessibility by default.
6. Performance where it matters.
7. Maintainability over shortcuts.
8. Test critical logic.
9. Document meaningful changes.
10. Build for future scalability.

---

# Summary

A successful contributor to this project should be comfortable with:

- React
- TypeScript
- Tailwind CSS
- Context API
- useReducer
- Component-based architecture
- Functional programming concepts
- Accessibility
- Testing  
- Git workflows
- Documentation
- Collaborative development with AI tools

By following these standards, the project remains clean, maintainable, and ready for future growth