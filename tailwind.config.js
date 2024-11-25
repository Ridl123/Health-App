/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: { min: "426px", max: "768px" },
      // => @media (min-width: 425px) and (max-width: 768px) { ... }

      phone: { max: "425px" },
      phoneMin: { min: "426px" },

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
