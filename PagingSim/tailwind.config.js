/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient': 'linear-gradient(135deg, #6C8C8C 0%, #A9D9D0 100%)',
      },
        colors: {
          teal: "#6C8C8C",
          seafoam: "#A9D9D0",
          gold: "#A69C68",
          brown: "#59412C",
          darkGray: "#262524",
          darkRed: "#3D0803",
          darkdarkBlue: "#141423",
          espresso: "#261F1C",
          heavyPurple: "#662D2C",
          darkGray: "#262524",
          dimWhite: "rgba(255, 255, 255, 0.7)",
          dimBlue: "rgba(9, 151, 124, 0.1)",
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          inter: ["Inter", "sans-serif"],
          'PierSans-Bold': ['PierSans-Bold', 'sans-serif'],
          'PierSans-Regular': ['PierSans-Regular', 'sans-serif'],
          'PierSans-Light': ['PierSans-Light', 'sans-serif'],
          'PierSans-Medium': ['PierSans-Medium', 'sans-serif'],
        },
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
    plugins: [],
  };