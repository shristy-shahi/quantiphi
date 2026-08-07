# WORKFLOW.md

# Development Workflow

## Project

**Calorie Tracker & Macro Dashboard**

---

# Purpose

This document defines the complete development workflow for the project.

Every contributor (human or AI) should follow this workflow to ensure consistency, maintainability, and high code quality.

---

# Development Lifecycle

Every feature should follow this sequence:

```text
Requirement
      │
      ▼
Planning
      │
      ▼
Architecture Review
      │
      ▼
Implementation
      │
      ▼
Testing
      │
      ▼
Code Review
      │
      ▼
Documentation
      │
      ▼
Merge
      │
      ▼
Release
```

Never skip any stage.

---

# Feature Development Process

Before writing code, answer:

- What problem does this feature solve?
- Which components are affected?
- Which state changes are required?
- Does it require new types?
- Does it affect calculations?
- Does it require testing?

Only begin implementation after understanding the impact.

---

# Task Workflow

Every task follows these steps.

## Step 1

Understand the requirement.

Example

> Add Meal Delete functionality

---

## Step 2

Identify affected files.

Example

```text
MealCard.tsx

MealList.tsx

NutritionReducer.ts

NutritionContext.tsx
```

---

## Step 3

Update shared types if needed.

Never duplicate interfaces.

---

## Step 4

Implement business logic.

Business logic belongs in:

- reducer
- utils
- context

Never inside UI components.

---

## Step 5

Connect UI.

The UI should only display data and trigger actions.

---

## Step 6

Test.

Verify:

- functionality
- edge cases
- responsiveness

---

## Step 7

Update documentation if application behavior changed.

---

# Git Workflow

## Main Branch

```text
main
```

Always stable.

---

## Development Branch

```text
develop
```

Contains completed features waiting for release.

---

## Feature Branch

Naming

```text
feature/meal-history

feature/dashboard

feature/image-upload

feature/calorie-progress
```

---

## Bug Fix Branch

```text
fix/calculation

fix/delete-meal

fix/modal

fix/progress-bar
```

---

## Refactor Branch

```text
refactor/reducer

refactor/components

refactor/context
```

---

# Commit Convention

Follow Conventional Commits.

## Features

```text
feat: add meal logging
```

---

## Bug Fixes

```text
fix: correct protein calculation
```

---

## Documentation

```text
docs: update architecture
```

---

## Refactoring

```text
refactor: simplify reducer logic
```

---

## Testing

```text
test: add nutrition calculator tests
```

---

## Performance

```text
perf: memoize dashboard calculations
```

---

# Pull Request Workflow

Before creating a PR:

- Build succeeds
- Tests pass
- No TypeScript errors
- No ESLint warnings
- Documentation updated
- Screenshots added if UI changed

---

# Code Review Checklist

Reviewers should verify:

## Architecture

- Follows project structure
- No duplicated logic
- Correct folder placement

---

## TypeScript

- No `any`
- Strong typing
- Shared interfaces reused

---

## Components

- Small
- Reusable
- Single responsibility

---

## State

- Immutable updates
- Reducer used correctly
- No duplicated state

---

## UI

- Responsive
- Accessible
- Consistent spacing
- Keyboard friendly

---

## Performance

- No unnecessary re-renders
- Proper memoization
- Efficient calculations

---

# Testing Workflow

Every feature should include testing where appropriate.

Priority order:

## Unit Tests

Test

- calculator
- reducer
- utility functions

---

## Component Tests

Test

- MealForm
- MealCard
- Dashboard
- GoalToggle
- WarningModal

---

## Integration Tests

Verify:

- Add meal
- Delete meal
- Goal switching
- Dashboard updates

---

# Bug Fix Workflow

When fixing a bug:

1. Reproduce it.
2. Identify the root cause.
3. Fix the smallest possible area.
4. Add a regression test.
5. Verify no new issues were introduced.

Avoid broad, unrelated refactoring.

---

# Refactoring Workflow

Refactor only when:

- Logic is duplicated
- Code is difficult to understand
- Components are too large
- Performance needs improvement

Do not change behavior during refactoring.

---

# Documentation Workflow

Update documentation whenever:

- Architecture changes
- Folder structure changes
- New components are added
- New APIs are introduced
- User workflow changes

Keep documentation synchronized with the codebase.

---

# Deployment Workflow

Before deployment:

1. Install dependencies

```bash
npm install
```

2. Run linting

```bash
npm run lint
```

3. Execute tests

```bash
npm test
```

4. Create production build

```bash
npm run build
```

5. Preview production build

```bash
npm run preview
```

Only deploy successful builds.

---

# Release Checklist

Before a release:

- All planned features complete
- Tests passing
- No console errors
- No accessibility issues
- Responsive on mobile, tablet, and desktop
- Documentation updated
- Version number updated
- Changelog updated

---

# Branch Protection Rules

The `main` branch should:

- Require pull requests
- Require successful CI checks
- Prevent force pushes
- Require at least one review

---

# AI Development Workflow

When an AI assistant works on the project:

1. Read `README.md`
2. Read `ARCHITECTURE.md`
3. Read `AGENTS.md`
4. Understand the task
5. Update the minimum number of files
6. Preserve existing architecture
7. Avoid duplicate utilities
8. Keep components reusable
9. Add or update tests if necessary
10. Update documentation when behavior changes

---

# Performance Guidelines

Always prefer:

- React.memo
- useMemo
- useCallback
- Lazy loading where appropriate
- Efficient state updates

Avoid premature optimization but prevent obvious inefficiencies.

---

# Accessibility Checklist

Every UI contribution must include:

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Sufficient color contrast
- Screen reader compatibility

Accessibility is a required feature, not an enhancement.

---

# Workflow Principles

Every contribution should be:

- Small
- Focused
- Well-tested
- Documented
- Easy to review
- Easy to maintain

The goal is to build a clean, scalable, and production-ready application while keeping development predictable and collaborative.