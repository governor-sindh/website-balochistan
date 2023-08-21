/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#64871e",
        sub: "#aab830",
      },
    },
    screens: {
      xs: "500px",
      sm: "639px",
      md: "769px",
      lg: "1025px",
      "xl-lg": "1100px",
      xl: "1350px",
      "2xl": "1535px",
    },
  },
  plugins: [],
};
