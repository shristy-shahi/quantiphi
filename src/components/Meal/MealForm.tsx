import React, { useState, useRef, useCallback } from 'react';
import { useNutrition } from '../../hooks/useNutrition';
import { FOOD_DATABASE } from '../../data/foodDatabase';
import type { MockFood } from '../../data/foodDatabase';
import { scaleNutrient } from '../../utils/calculator';
import { analyzeFood, fileToBase64, hasApiKey } from '../../utils/openai';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { Camera, Sparkles, Scale, Volume2, Upload, ImagePlus, Zap, Check, AlertTriangle, Video, VideoOff } from 'lucide-react';

const playBeep = (freq = 800, duration = 0.15, type: OscillatorType = 'sine') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  } catch (_e) {
    // Ignore audio failures silently
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
  const [scanConfidence, setScanConfidence] = useState<number>(0);
  const [scanError, setScanError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isApiMode, setIsApiMode] = useState(false);

  // Live Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Refs
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
    setScanError(null);
    if (soundEnabled) playBeep(900, 0.1, 'triangle');
  };

  // Close Live Camera Feed
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Open Live Camera Feed
  const startCamera = async () => {
    setCameraError(null);
    setScanError(null);
    setScanResultName(null);
    setPreviewImage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      if (soundEnabled) playBeep(700, 0.15, 'sine');
    } catch (err) {
      setCameraError('Camera access denied or unavailable. Please upload a photo instead.');
      setIsCameraActive(false);
      if (soundEnabled) playBeep(300, 0.3, 'sawtooth');
    }
  };

  // Image processing entrypoint
  const handleImageString = async (base64: string) => {
    setScanError(null);
    setIsScanning(true);
    setIsApiMode(true);
    setScanResultName(null);
    setScanConfidence(0);

    try {
      setPreviewImage(base64);

      if (soundEnabled) playBeep(520, 0.2, 'sine');

      if (hasApiKey()) {
        const steps = [
          'Encoding image payload...',
          'Transmitting to GPT-4o vision core...',
          'Analyzing molecular food signatures...',
          'Extracting nutritional telemetry...',
        ];

        for (let i = 0; i < steps.length; i++) {
          setScanStep(steps[i]);
          if (soundEnabled) playBeep(600 + i * 80, 0.08, 'sine');
          await new Promise(r => setTimeout(r, 350));
        }

        setScanStep('Awaiting orbital response...');
        const result = await analyzeFood(base64);

        setFoodName(result.name);
        setGrams(result.estimatedGrams);
        setBaseCalories(result.caloriesPer100g);
        setBaseProtein(result.proteinPer100g);
        setBaseCarbs(result.carbsPer100g);
        setBaseFats(result.fatsPer100g);
        setScanResultName(result.name);
        setScanConfidence(result.confidence);
        setErrors({});

        if (soundEnabled) {
          playBeep(1000, 0.1, 'sine');
          setTimeout(() => playBeep(1200, 0.15, 'sine'), 80);
        }
      } else {
        await runMockScan();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Analysis failed. Please try again.';
      setScanError(message);
      if (soundEnabled) playBeep(250, 0.3, 'sawtooth');
    } finally {
      setIsScanning(false);
    }
  };

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setScanError('Please upload an image file (JPG, PNG, WebP, etc.).');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setScanError('Image must be under 20 MB.');
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      await handleImageString(base64);
    } catch (e) {
      setScanError('Failed to read image payload.');
    }
  };

  // Capture Snapshot Frame from Video
  const captureSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw active video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg');

      // Stop camera feed
      stopCamera();

      // Trigger analysis
      handleImageString(base64);
    } catch (e) {
      setScanError('Failed to capture frame from video.');
      stopCamera();
    }
  };

  // Mock scan handler
  const runMockScan = async () => {
    setIsApiMode(false);
    const steps = [
      'Initializing health vision sensor...',
      'Refracting light spectrum analysis...',
      'Matching molecular signature against local base...',
      'De-gravitating food mass readings...',
      'Locking coordinates...',
    ];

    for (let i = 0; i < steps.length; i++) {
      setScanStep(steps[i]);
      if (soundEnabled) playBeep(600 + i * 80, 0.08, 'sine');
      await new Promise(r => setTimeout(r, 400));
    }

    const randomFood = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
    const randomGrams = [80, 120, 150, 200, 250, 300][Math.floor(Math.random() * 6)];

    setGrams(randomGrams);
    setFoodName(randomFood.name);
    setBaseCalories(randomFood.caloriesPer100g);
    setBaseProtein(randomFood.proteinPer100g);
    setBaseCarbs(randomFood.carbsPer100g);
    setBaseFats(randomFood.fatsPer100g);
    setScanResultName(randomFood.name);
    setScanConfidence(0.95);
    setErrors({});

    if (soundEnabled) {
      playBeep(1000, 0.1, 'sine');
      setTimeout(() => playBeep(1200, 0.15, 'sine'), 80);
    }
  };

  const triggerMockScan = async () => {
    if (isScanning) return;
    stopCamera();
    setIsScanning(true);
    setScanError(null);
    setScanResultName(null);
    setPreviewImage(null);
    try {
      await runMockScan();
    } finally {
      setIsScanning(false);
    }
  };

  // Drag-and-drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    stopCamera();
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  }, [soundEnabled, stopCamera]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    stopCamera();
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = '';
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

    setFoodName('');
    setGrams(100);
    setScanResultName(null);
    setPreviewImage(null);
    setScanConfidence(0);
    setScanError(null);
    if (soundEnabled) {
      playBeep(880, 0.1, 'sine');
      setTimeout(() => playBeep(1320, 0.25, 'sine'), 100);
    }
  };

  const confidenceColor = scanConfidence >= 0.8
    ? 'text-emerald-400'
    : scanConfidence >= 0.5
      ? 'text-amber-400'
      : 'text-red-400';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
      {/* Left Column: Form Input */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl lg:col-span-7 flex flex-col gap-5 border-blue-500/10">
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
              placeholder="e.g. Chicken breast, Paneer tikka"
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

          <div className="border-t border-slate-800/60 pt-4 mt-1">
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

          {/* Scaled preview */}
          {foodName.trim() && (
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-1">
              <div className="flex items-center gap-2 text-slate-400">
                <Scale className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold">Scaled for {grams}g:</span>
              </div>
              <div className="flex gap-3 sm:gap-4 text-xs font-mono font-bold text-slate-300 flex-wrap">
                <span className="text-blue-300">{scaledCalories} kcal</span>
                <span className="text-emerald-300">P: {scaledProtein}g</span>
                <span className="text-amber-300">C: {scaledCarbs}g</span>
                <span className="text-purple-300">F: {scaledFats}g</span>
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full mt-1 font-bold uppercase tracking-wider py-3">
            <Zap className="w-4 h-4 mr-2 inline-block" />
            Confirm and Log Meal
          </Button>
        </form>

        {/* Preset quick-select */}
        <div className="border-t border-slate-800/60 pt-4 mt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
            Quick-Select Preset Database
          </span>
          <div className="flex flex-wrap gap-2">
            {FOOD_DATABASE.map((food) => (
              <button
                key={food.name}
                type="button"
                onClick={() => applyFoodPreset(food)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs font-medium text-slate-300 hover:border-blue-500/30 hover:text-blue-300 hover:bg-slate-800/80 transition-all duration-300 flex items-center gap-1.5 hover:shadow-[0_0_10px_rgba(59,130,246,0.08)]"
              >
                <span className="text-sm">{food.image}</span>
                <span>{food.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: AI Scanner */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl lg:col-span-5 flex flex-col gap-4 border-blue-500/10 min-h-[380px]">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400 text-glow-accent" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Aarogya Food Vision
            </h2>
          </div>
          {hasApiKey() && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Zap className="w-3 h-3" /> Live
            </span>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload food image"
        />

        {/* Drop zone / Scanner viewport */}
        <div
          className={`relative flex-1 rounded-2xl border-2 border-dashed overflow-hidden flex flex-col items-center justify-center p-4 text-center transition-all duration-300 min-h-[220px] ${
            isDragging
              ? 'border-blue-400 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
              : isScanning
                ? 'border-blue-500/30 bg-slate-950'
                : 'border-slate-800/60 bg-slate-950/60 hover:border-slate-700/60 hover:bg-slate-950/80'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="region"
          aria-label="Food photo drop zone"
        >
          {isCameraActive ? (
            <div className="absolute inset-0 w-full h-full flex flex-col justify-end">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
              />
              <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-0.5 bg-red-500/20 text-red-400 rounded-full border border-red-500/40 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                <Video className="w-3.5 h-3.5" /> LIVE CAMERA STREAM
              </div>
              <div className="relative z-10 p-3 bg-gradient-to-t from-slate-950/95 to-slate-950/20 flex gap-2 w-full">
                <Button
                  type="button"
                  variant="primary"
                  onClick={captureSnapshot}
                  className="flex-1 text-[10px] font-bold tracking-wider uppercase py-2 flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" /> Snapshot Dish
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={stopCamera}
                  className="text-[10px] font-bold tracking-wider uppercase py-2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : isScanning ? (
            <>
              <div className="scan-line" />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Food telemetry focus"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-3 animate-pulse">
                <div className="w-14 h-14 rounded-full border-2 border-blue-500/40 flex items-center justify-center bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Camera className="w-7 h-7 animate-spin" />
                </div>
                <span className="text-sm font-bold text-blue-400 tracking-wide text-glow-accent">
                  ANALYZING
                </span>
                <span className="text-[11px] text-slate-400 max-w-[220px] leading-relaxed font-mono">
                  {scanStep}
                </span>
              </div>
            </>
          ) : scanResultName ? (
            <div className="flex flex-col items-center gap-3 py-2">
              {previewImage ? (
                <div className="w-20 h-20 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <img src={previewImage} alt={scanResultName} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 text-3xl shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  {FOOD_DATABASE.find(f => f.name === scanResultName)?.image || '🍽️'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 justify-center mb-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {isApiMode ? 'AI Detection Complete' : 'Mock Scan Complete'}
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-100 block">
                  {scanResultName}
                </span>
                <div className="flex items-center gap-3 justify-center mt-1.5 text-[10px] font-mono">
                  <span className="text-slate-500">Mass: <strong className="text-slate-300">{grams}g</strong></span>
                  <span className={`${confidenceColor}`}>
                    Confidence: <strong>{Math.round(scanConfidence * 100)}%</strong>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4 cursor-pointer w-full h-full justify-center" onClick={() => fileInputRef.current?.click()}>
              <div className="w-14 h-14 rounded-2xl border border-slate-800/80 flex items-center justify-center text-slate-500 bg-slate-900/40 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300">
                <ImagePlus className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {isDragging ? 'Drop Image Here' : 'Upload Food Photo'}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1.5 max-w-[200px] leading-relaxed mx-auto">
                  {hasApiKey()
                    ? 'Drop or click to upload. GPT-4o will detect food & nutrients.'
                    : 'Configure API key in Settings for real detection, or use mock scan.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error notification display */}
        {scanError && (
          <div className="flex items-start gap-2 bg-red-950/30 border border-red-500/20 rounded-xl p-3 text-xs text-red-300">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{scanError}</span>
          </div>
        )}
        {cameraError && (
          <div className="flex items-start gap-2 bg-red-950/30 border border-red-500/20 rounded-xl p-3 text-xs text-red-300">
            <VideoOff className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{cameraError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            onClick={startCamera}
            disabled={isScanning || isCameraActive}
            variant="secondary"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-1.5"
            title="Start live device camera capture"
          >
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span>Camera</span>
          </Button>

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning || isCameraActive}
            variant="primary"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload</span>
          </Button>

          <Button
            type="button"
            onClick={triggerMockScan}
            disabled={isScanning || isCameraActive}
            variant="secondary"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Mock</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
