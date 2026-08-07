# 🥗 Calorie Tracker & Macro Dashboard

A modern, responsive web application that helps users track their daily calorie intake and macronutrients in real time. Users can log meals manually or through a simulated AI image upload, monitor their nutritional progress with interactive dashboards, and receive instant feedback when exceeding their daily calorie budget.

---

# ✨ Features

## 🍽️ Smart Meal Logging

* Add meals manually by entering the food name and serving size (grams).
* Simulated **AI Image Upload** that automatically fills food details using predefined mock data.
* Real-time nutritional calculations based on serving size.

## 📊 Live Nutrition Dashboard

Track your daily nutrition with:

* Daily Calorie Progress Bar
* Protein Progress
* Carbohydrate Progress
* Fat Progress
* Remaining Calories
* Calories Consumed

All values update instantly whenever meals are added or removed.

## 🎯 Fitness Goal Selection

Switch between:

* 🔥 Weight Loss
* ⚖️ Maintenance
* 💪 Muscle Gain

Changing the fitness goal dynamically updates calorie and macronutrient targets **without removing previously logged meals**.

## 🚨 Dynamic Warning System

If total consumed calories exceed the selected daily target:

* The calorie progress bar changes to **Crimson Red**
* A warning modal displays:

> **"Daily Budget Exceeded!"**

## 🗑️ Meal History

Every logged meal includes:

* Food Name
* Serving Size
* Calories
* Protein
* Carbohydrates
* Fat
* Delete Action

Removing a meal immediately recalculates all dashboard values.

---

# 🖥️ Screenshots

> *(Add screenshots after implementation.)*

* Dashboard
* Meal Logging Panel
* Fitness Goal Toggle
* Warning Modal
* Meal History

---

# 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### State Management

* React Context API
* useReducer

### Icons

* Lucide React

### Testing

* Vitest
* React Testing Library

---

# 📂 Project Structure

```text
calorie-tracker/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── README.md
├── ARCHITECTURE.md
├── AGENTS.md
├── CLAUDE.md
├── WORKFLOW.md
├── SKILLS.md
├── PROMPTS.md
├── package.json
└── vite.config.ts
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/calorie-tracker.git
```

Navigate into the project:

```bash
cd calorie-tracker
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the Project

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 📖 How It Works

### 1. Select a Fitness Goal

Choose one of the available goals:

* Weight Loss
* Maintenance
* Muscle Gain

This updates the target calories and macronutrients.

---

### 2. Log a Meal

Enter:

* Food Name
* Serving Size (grams)

Or click **Image Upload** to autofill the form using predefined food data.

---

### 3. Automatic Nutrient Calculation

Nutrition values are calculated using:

```
Scaled Nutrient = (Nutrient per 100g × Entered Weight) / 100
```

Example:

Food (per 100g):

```
Calories : 165
Protein  : 31g
Carbs    : 0g
Fat      : 3.6g
```

User enters:

```
200g
```

Result:

```
Calories : 330
Protein  : 62g
Carbs    : 0g
Fat      : 7.2g
```

---

### 4. Dashboard Updates

Every meal instantly updates:

* Calories
* Protein
* Carbohydrates
* Fat
* Progress bars
* Remaining calories

---

### 5. Delete Meals

Deleting a meal recalculates all totals automatically.

---

# 🎯 Fitness Goals

| Goal        | Calories | Protein | Carbs | Fat |
| ----------- | -------: | ------: | ----: | --: |
| Weight Loss |     1800 |    140g |  180g | 60g |
| Maintenance |     2200 |    150g |  250g | 70g |
| Muscle Gain |     2800 |    180g |  320g | 80g |

---

# 🧠 Key Features

* Real-time calculations
* Dynamic dashboard
* Responsive design
* Strong TypeScript support
* Accessible UI
* Modular architecture
* Reusable components
* Centralized state management
* Mock AI image upload
* Smooth progress animations

---

# 🧪 Testing

Run all tests:

```bash
npm test
```

Recommended test coverage:

* Nutrition calculations
* Goal switching
* Reducer logic
* Meal addition
* Meal deletion
* Progress bar updates
* Warning modal behavior

---

# 🚀 Future Enhancements

* Real AI food recognition
* Barcode scanner
* Nutrition API integration
* User authentication
* Cloud synchronization
* Weekly and monthly reports
* Charts and analytics
* Dark mode
* Offline support (PWA)
* Mobile application
* Personalized nutrition recommendations

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes using Conventional Commits.
4. Submit a pull request.

Please follow the project's architecture, workflow, and coding standards.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

Built as a modern health-tracking prototype demonstrating real-time state management, responsive UI development, and scalable frontend architecture using React and TypeScript.
