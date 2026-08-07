/**
 * OpenAI Vision API integration for food detection.
 * Sends a base64-encoded image to the GPT-4o model and asks it
 * to identify the food and estimate nutritional values per 100g.
 *
 * Falls back to the mock food database when no API key is configured.
 */

export interface DetectedFood {
  name: string;
  estimatedGrams: number;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatsPer100g: number;
  confidence: number; // 0–1
}

const SYSTEM_PROMPT = `You are a nutrition analysis AI. When given an image of food, respond ONLY with a JSON object (no markdown, no explanation, no code fences) in exactly this format:
{
  "name": "Food Name",
  "estimatedGrams": 150,
  "caloriesPer100g": 165,
  "proteinPer100g": 31,
  "carbsPer100g": 0,
  "fatsPer100g": 3.6,
  "confidence": 0.85
}

Rules:
- "name" should be a short, common name for the food item visible in the image.
- "estimatedGrams" is your best guess of the portion size shown.
- All nutrient values are per 100 grams of the food.
- "confidence" is a float between 0 and 1 indicating how confident you are in the identification.
- If multiple food items are visible, pick the most prominent one.
- If you cannot identify the food, set name to "Unknown Food", confidence to 0, and use reasonable average values.
- Output ONLY the JSON object, nothing else.`;

/**
 * Reads the API key from the in-memory store (set via the Settings panel in the UI).
 * We never persist this to disk—only held in the React state tree.
 */
let _apiKey = (import.meta.env?.VITE_OPENAI_API_KEY as string) || '';

export const setOpenAIApiKey = (key: string): void => {
  _apiKey = key.trim();
};

export const getOpenAIApiKey = (): string => _apiKey;

export const hasApiKey = (): boolean => _apiKey.length > 0;

/**
 * Convert a File object to a base64 data URL string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Call the OpenAI Chat Completions API with a vision message.
 * Uses gpt-4o-mini for speed and cost efficiency.
 */
export const analyzeFood = async (base64Image: string): Promise<DetectedFood> => {
  if (!hasApiKey()) {
    throw new Error('OpenAI API key is not configured. Please add your key in Settings.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${_apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this food image and provide nutritional information.',
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'low', // Faster + cheaper
              },
            },
          ],
        },
      ],
      max_tokens: 300,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    if (response.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your key in Settings.');
    }
    if (response.status === 429) {
      throw new Error('OpenAI rate limit reached. Please wait a moment and try again.');
    }
    throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No response received from OpenAI.');
  }

  // Parse the JSON, stripping any accidental markdown fences
  const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  const parsed = JSON.parse(cleaned) as DetectedFood;

  // Validate and clamp values
  return {
    name: parsed.name || 'Unknown Food',
    estimatedGrams: Math.max(1, Math.round(parsed.estimatedGrams || 100)),
    caloriesPer100g: Math.max(0, Number(parsed.caloriesPer100g) || 0),
    proteinPer100g: Math.max(0, Number(parsed.proteinPer100g) || 0),
    carbsPer100g: Math.max(0, Number(parsed.carbsPer100g) || 0),
    fatsPer100g: Math.max(0, Number(parsed.fatsPer100g) || 0),
    confidence: Math.min(1, Math.max(0, Number(parsed.confidence) || 0)),
  };
};
