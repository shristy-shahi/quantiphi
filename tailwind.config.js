/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gravity: {
          dark: '#030712',
          card: '#0f172a',
          accent: '#3b82f6',
          glowing: '#10b981',
          danger: '#ef4444',
          crimson: '#991b1b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
