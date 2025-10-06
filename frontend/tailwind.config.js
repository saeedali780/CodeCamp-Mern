import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["synthwave"/*, "dark"*/],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}
