import { tokens } from './src/lib/tokens.config.js';
import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.sizes,
      borderRadius: tokens.radius,
      spacing: tokens.spacing,
      boxShadow: tokens.shadows,
    },
  },
  plugins: [tailwindAnimate],
}
