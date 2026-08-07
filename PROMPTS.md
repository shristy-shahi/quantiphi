# PROMPTS.md

# AI Prompt Library

## Project

**Calorie Tracker & Macro Dashboard**

---

# Purpose

This document contains reusable prompts for AI coding assistants such as ChatGPT, Claude Code, Cursor, GitHub Copilot, and Gemini. These prompts are designed to produce consistent, production-quality code that follows the project's architecture and coding standards.

---

# General Rules

Before responding to any prompt:

- Read `README.md`
- Follow `ARCHITECTURE.md`
- Follow `AGENTS.md`
- Respect `WORKFLOW.md`
- Follow `SKILLS.md`
- Reuse existing components before creating new ones
- Never duplicate business logic
- Keep TypeScript types strict

---

# Feature Development

## Prompt 1 — Build a New Component

```text
Create a reusable React + TypeScript component following the project architecture. Use Tailwind CSS, strong typing, accessibility best practices, and avoid business logic inside the component.
```

---

## Prompt 2 — Add a Feature

```text
Implement the requested feature without breaking existing functionality. Reuse existing utilities and update reducers, tests, and documentation if necessary.
```

---

## Prompt 3 — Build From Requirements

```text
Implement the following feature from the specification. Break the work into reusable components, utilities, and reducer actions. Keep the solution scalable and maintainable.
```

---

# UI Development

## Prompt 4 — Responsive UI

```text
Build a fully responsive UI using Tailwind CSS. Support mobile, tablet, and desktop layouts while maintaining accessibility.
```

---

## Prompt 5 — Dashboard

```text
Create a dashboard that updates in real time based on application state. Avoid unnecessary re-renders.
```

---

## Prompt 6 — Form

```text
Create a reusable form with validation, keyboard accessibility, and clear error messages.
```

---

# State Management

## Prompt 7 — Reducer

```text
Implement reducer logic using immutable state updates. Keep each action focused on a single responsibility.
```

---

## Prompt 8 — Context

```text
Create a Context Provider with TypeScript and useReducer. Expose only the required state and actions.
```

---

## Prompt 9 — Custom Hook

```text
Create a reusable custom hook that encapsulates shared logic and keeps components clean.
```

---

# Nutrition Engine

## Prompt 10 — Scaling Algorithm

```text
Implement nutrient scaling using:

Scaled Value = (Base Value × Grams) / 100

Return calories, protein, carbohydrates, and fats.
```

---

## Prompt 11 — Daily Totals

```text
Calculate daily nutrition totals by aggregating every logged meal.
```

---

## Prompt 12 — Goal Switching

```text
Update calorie and macro targets when the fitness goal changes without deleting meal history.
```

---

# Progress Bars

## Prompt 13

```text
Create animated progress bars that update smoothly from application state.
```

---

## Prompt 14

```text
Turn the calorie progress bar crimson when consumed calories exceed the selected daily target.
```

---

# Image Upload

## Prompt 15

```text
Simulate an AI image upload by selecting a predefined food from the mock database and autofilling the form.
```

---

# Modal

## Prompt 16

```text
Display a warning modal when calorie consumption exceeds the target. Closing the modal must not modify application state.
```

---

# Meal History

## Prompt 17

```text
Create a reusable meal list with delete functionality and automatic dashboard updates.
```

---

# Validation

## Prompt 18

```text
Validate user input for empty food names, invalid numbers, negative values, and zero grams. Display friendly error messages.
```

---

# Refactoring

## Prompt 19

```text
Refactor the code while preserving behavior. Remove duplicated logic, improve readability, and keep components reusable.
```

---

## Prompt 20

```text
Split oversized components into smaller reusable components following the Single Responsibility Principle.
```

---

# Performance

## Prompt 21

```text
Optimize rendering using React.memo, useMemo, and useCallback where beneficial. Explain why each optimization is used.
```

---

## Prompt 22

```text
Identify unnecessary re-renders and recommend improvements without changing application behavior.
```

---

# Accessibility

## Prompt 23

```text
Review the application for accessibility. Add ARIA attributes, keyboard navigation, focus management, and semantic HTML where necessary.
```

---

# Testing

## Prompt 24

```text
Write comprehensive Vitest unit tests for the nutrition calculator.
```

---

## Prompt 25

```text
Write reducer tests covering add meal, delete meal, and goal switching.
```

---

## Prompt 26

```text
Write React Testing Library tests for the MealForm component.
```

---

## Prompt 27

```text
Write integration tests verifying that dashboard values update correctly after adding and deleting meals.
```

---

# Bug Fixing

## Prompt 28

```text
Identify the root cause of the reported bug, explain it, implement the smallest safe fix, and ensure no regressions are introduced.
```

---

## Prompt 29

```text
Review the reducer for logic errors, race conditions, and incorrect state updates.
```

---

# Code Review

## Prompt 30

```text
Perform a production-level code review. Evaluate readability, maintainability, performance, accessibility, architecture, and TypeScript quality.
```

---

# Documentation

## Prompt 31

```text
Update the README and architecture documentation to reflect the latest implementation changes.
```

---

## Prompt 32

```text
Generate JSDoc comments only where they add meaningful value. Avoid redundant comments.
```

---

# API Integration

## Prompt 33

```text
Prepare the project for future REST API integration without changing current functionality.
```

---

## Prompt 34

```text
Design TypeScript interfaces for API responses and requests following the existing architecture.
```

---

# Future Features

## Prompt 35

```text
Design a barcode scanner feature that integrates cleanly with the current architecture.
```

---

## Prompt 36

```text
Design an AI-powered food recognition feature while keeping the current mock implementation replaceable.
```

---

# Security

## Prompt 37

```text
Review the application for potential security issues, unsafe assumptions, and improper input handling.
```

---

# Git

## Prompt 38

```text
Generate Conventional Commit messages for the current changes.
```

---

## Prompt 39

```text
Generate a pull request description summarizing changes, testing performed, and any breaking changes.
```

---

# Deployment

## Prompt 40

```text
Verify the application is production-ready by checking build output, responsiveness, accessibility, documentation, and testing.
```

---

# Architecture Review

## Prompt 41

```text
Review the implementation against ARCHITECTURE.md and identify any deviations or improvements.
```

---

# AI Behavior

When using any AI assistant:

- Read project documentation first.
- Preserve the existing architecture.
- Avoid duplicate utilities.
- Prefer reusable components.
- Keep reducers pure.
- Use strict TypeScript.
- Add tests for business logic.
- Update documentation when behavior changes.
- Explain trade-offs for significant architectural decisions.
- Choose the simplest maintainable solution that satisfies the requirements.

---

# Prompt Usage Workflow

For every development task:

1. Understand the requirement.
2. Review the architecture.
3. Select the appropriate prompt(s).
4. Implement the change.
5. Run tests.
6. Review performance and accessibility.
7. Update documentation.
8. Commit using Conventional Commits.

---

# Final Principle

Every AI-generated contribution should improve the project without increasing unnecessary complexity.

The goal is to produce clean, maintainable, accessible, scalable, and production-ready software that follows the project's architecture and development standards.