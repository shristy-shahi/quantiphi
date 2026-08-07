import React, { useState, useEffect, useRef } from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { FOOD_DATABASE, MockFood } from '../../data/foodDatabase';
import { scaleNutrient } from '../../utils/calculator';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { Camera, Sparkles, Scale, AlertCircle, Volume2 } from 'lucide-react';

const playBeep = (freq = 800, duration = 0.15, type: OscillatorType = 'sine') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignore audio failures
  }
};

export const MealForm: React.FC = () => {
  const { dispatch } = useNutrition();

  // Form Fields
  const [foodName, setFoodName] = useState('');
  const [grams, setGrams] = useState(100);
  const [baseCalories, setBaseCalories] = useState<number | string>(100);
  const [baseProtein, setBaseProtein] = useState<number | string>(10);
  const [baseCarbs, setBaseCarbs] = useState<number | string>(10);
  const [baseFats, setBaseFats] = useState<number | string>(2);

  // UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanResultName, setScanResultName] = useState<string | null>(null);

  // Sound feedback toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!foodName.trim()) {
      newErrors.foodName = 'Food name is required';
    }

    if (grams <= 0) {
      newErrors.grams = 'Weight must be greater than 0';
    } else if (isNaN(Number(grams))) {
      newErrors.grams = 'Weight must be a valid number';
    }

    const checkNutrient = (val: number | string, field: string, label: string) => {
      const num = Number(val);
      if (val === '' || isNaN(num)) {
        newErrors[field] = `${label} must be a number`;
      } else if (num < 0) {
        newErrors[field] = `${label} cannot be negative`;
      }
    };

    checkNutrient(baseCalories, 'calories', 'Calories');
    checkNutrient(baseProtein, 'protein', 'Protein');
    checkNutrient(baseCarbs, 'carbs', 'Carbs');
    checkNutrient(baseFats, 'fats', 'Fats');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time scaled values
  const scaledCalories = scaleNutrient(Number(baseCalories) || 0, grams);
  const scaledProtein = scaleNutrient(Number(baseProtein) || 0, grams);
  const scaledCarbs = scaleNutrient(Number(baseCarbs) || 0, grams);
  const scaledFats = scaleNutrient(Number(baseFats) || 0, grams);

  // Handle Preset Selection
  const applyFoodPreset = (food: MockFood) => {
    setFoodName(food.name);
    setBaseCalories(food.caloriesPer100g);
    setBaseProtein(food.proteinPer100g);
    setBaseCarbs(food.carbsPer100g);
    setBaseFats(food.fatsPer100g);
    setErrors({});
    if (soundEnabled) playBeep(900, 0.1, 'triangle');
  };

  // Simulating AI Image Scan
  const triggerAIScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanResultName(null);
    if (soundEnabled) playBeep(520, 0.2, 'sine');

    const steps = [
      'Initializing gravity-defying vision sensor...',
      'Refracting light spectrum analysis...',
      'Matching molecular signature against mock base...',
      'De-gravitating food mass readings...',
      'Locking coordinates...'
    ];

    let currentStep = 0;
    setScanStep(steps[0]);

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStep(steps[currentStep]);
        if (soundEnabled) playBeep(600 + currentStep * 80, 0.08, 'sine');
      } else {
        clearInterval(stepInterval);

        // Pick a random mock food
        const randomFood = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
        const randomGrams = [80, 120, 150, 200, 250, 300][Math.floor(Math.random() * 6)];

        // Set state
        setGrams(randomGrams);
        setFoodName(`${randomFood.image} ${randomFood.name} (Scan)`);
        setBaseCalories(randomFood.caloriesPer100g);
        setBaseProtein(randomFood.proteinPer100g);
        setBaseCarbs(randomFood.carbsPer100g);
        setBaseFats(randomFood.fatsPer100g);
        setScanResultName(randomFood.name);

        setIsScanning(false);
        setErrors({});
        if (soundEnabled) {
          playBeep(1000, 0.1, 'sine');
          setTimeout(() => playBeep(1200, 0.15, 'sine'), 80);
        }
      }
    }, 400);
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      if (soundEnabled) playBeep(250, 0.3, 'sawtooth');
      return;
    }

    dispatch({
      type: 'ADD_MEAL',
      payload: {
        name: foodName.trim(),
        grams: Number(grams),
        calories: scaledCalories,
        protein: scaledProtein,
        carbs: scaledCarbs,
        fats: scaledFats,
      },
    });

    // Reset Form (keep base values but clear name)
    setFoodName('');
    setGrams(100);
    setScanResultName(null);
    if (soundEnabled) {
      playBeep(880, 0.1, 'sine');
      setTimeout(() => playBeep(1320, 0.25, 'sine'), 100);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Left Column: Form Input */}
      <div className="glass-panel p-6 rounded-3xl lg:col-span-7 flex flex-col gap-5 border-blue-500/10">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400 text-glow-accent" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Meal Input Matrix
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border transition-all duration-300 ${
              soundEnabled
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.15)]'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            aria-label={soundEnabled ? 'Disable sonification' : 'Enable sonification'}
            title={soundEnabled ? 'Disable sonification' : 'Enable sonification'}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleAddMeal} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Item Identifier"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Chicken breast, Protein shake"
              error={errors.foodName}
              required
            />

            <Input
              label="Payload Mass (grams)"
              id="grams"
              type="number"
              min="1"
              value={grams}
              onChange={(e) => setGrams(Math.max(1, Number(e.target.value)))}
              placeholder="e.g. 150"
              error={errors.grams}
              required
            />
          </div>

          <div className="border-t border-slate-800/60 pt-4 mt-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
              Base Nutrients Per 100g
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Input
                label="Calories (kcal)"
                id="baseCalories"
                type="number"
                min="0"
                value={baseCalories}
                onChange={(e) => setBaseCalories(e.target.value)}
                error={errors.calories}
              />
              <Input
                label="Protein (g)"
                id="baseProtein"
                type="number"
                min="0"
                step="0.1"
                value={baseProtein}
                onChange={(e) => setBaseProtein(e.target.value)}
                error={errors.protein}
              />
              <Input
                label="Carbs (g)"
                id="baseCarbs"
                type="number"
                min="0"
                step="0.1"
                value={baseCarbs}
                onChange={(e) => setBaseCarbs(e.target.value)}
                error={errors.carbs}
              />
              <Input
                label="Fats (g)"
                id="baseFats"
                type="number"
                min="0"
                step="0.1"
                value={baseFats}
                onChange={(e) => setBaseFats(e.target.value)}
                error={errors.fats}
              />
            </div>
          </div>

          {/* Scaled preview box */}
          {foodName.trim() && (
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex justify-between items-center mt-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Scale className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold">Scaling Core Matrix:</span>
              </div>
              <div className="flex gap-4 text-xs font-mono font-bold text-slate-300">
                <span>{scaledCalories} kcal</span>
                <span>P: {scaledProtein}g</span>
                <span>C: {scaledCarbs}g</span>
                <span>F: {scaledFats}g</span>
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full mt-2 font-bold uppercase tracking-wider">
            Confirm and Log Meal
          </Button>
        </form>

        {/* Preset selections */}
        <div className="border-t border-slate-800/60 pt-4 mt-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
            Quick-Select Preset Database
          </span>
          <div className="flex flex-wrap gap-2">
            {FOOD_DATABASE.map((food) => (
              <button
                key={food.name}
                type="button"
                onClick={() => applyFoodPreset(food)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-slate-600 transition-all duration-300 flex items-center gap-1.5 hover:bg-slate-800"
              >
                <span>{food.image}</span>
                <span>{food.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: AI Scanner Simulator */}
      <div className="glass-panel p-6 rounded-3xl lg:col-span-5 flex flex-col gap-4 border-blue-500/10 min-h-[350px]">
        <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Camera className="w-5 h-5 text-blue-400 text-glow-accent" />
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
            AI Gravity Vision Scan
          </h2>
        </div>

        <div className="relative flex-1 rounded-2xl bg-slate-950 border border-slate-900/60 overflow-hidden flex flex-col items-center justify-center p-6 text-center group min-h-[220px]">
          {isScanning ? (
            <>
              <div className="scan-line" />
              <div className="relative z-10 flex flex-col items-center gap-3 animate-pulse">
                <div className="w-12 h-12 rounded-full border border-blue-500/40 flex items-center justify-center bg-blue-500/5 text-blue-400 [filter:drop-shadow(0_0_8px_rgba(59,130,246,0.3))]">
                  <Camera className="w-6 h-6 animate-spin" />
                </div>
                <span className="text-sm font-semibold text-blue-400 tracking-wide text-glow-accent">
                  SCANNING SIGNATURE
                </span>
                <span className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed font-mono">
                  {scanStep}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              {scanResultName ? (
                <>
                  <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 text-3xl [filter:drop-shadow(0_0_12px_rgba(16,185,129,0.2))]">
                    {FOOD_DATABASE.find(f => f.name === scanResultName)?.image}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Scan Signature Matched
                    </span>
                    <span className="text-lg font-bold text-slate-100 mt-1 block">
                      {scanResultName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono block mt-0.5">
                      Mass: {grams}g detected
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-500 group-hover:border-blue-500/40 group-hover:text-blue-400 transition-all duration-300 bg-slate-900/40">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Feed Image Signal
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-[180px]">
                      Trigger simulated vision detection model of foods.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={triggerAIScan}
          disabled={isScanning}
          variant="secondary"
          className="w-full text-xs font-bold uppercase tracking-wider py-3 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Simulate Vision Analysis</span>
        </Button>
      </div>
    </div>
  );
};
