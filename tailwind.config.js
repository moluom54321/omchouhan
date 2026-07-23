/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00E5FF",
        secondary: "#6C63FF",
        accent: "#00FFC6",
        background: "#050816",
        "muted-text": "#94A3B8",
        "card-bg": "rgba(255, 255, 255, 0.05)",
        "border-color": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
