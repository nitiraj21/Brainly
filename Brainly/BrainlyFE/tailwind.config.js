/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors : {
        grey : {
          100 : "eeeeef",
          200 : "#e6e9ed",
          600 : "#95989c"
        },
        purple:{
          200 : "#d9ddee",
          600 : "#7164c0",
          500 : "#9492db"
        }
      },
      fontFamily:{
        orbitron: ["Orbitron", "sans-serif"],
        michroma: ["Michroma", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      height: {
        '85': '25.50rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-7px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        float2: 'float2 3s ease-in-out infinite',
      },

    }
  },
  plugins: [],
}

