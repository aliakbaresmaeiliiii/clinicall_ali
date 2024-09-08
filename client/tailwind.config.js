/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    // screens: {
    //   'xs': '320px', // Custom breakpoint for 320px screens
    // },
    screens: {
      'mobile': '320px',
      // => @media (min-width: 320px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
    colors: {
      primary: "#9cd67d",
      blue: "#8116f3",
      white: '#fff',
      gray: '#97A2B4',
      red: '#E95210',
      blueLight: '#DAE1F3',
      blueSky: '#EFF8FF',
      lightGray: '#D4E5F9'
    },

    keyframes: {
      moveLeftRight: {
        '0%, 100%': { transform: 'translateX(0)' },
        '50%': { transform: 'translateX(-20px)' },
      },
    },
    animation: {
      moveLeftRight: 'moveLeftRight 2s ease-in-out infinite',
    },
  },
  plugins: [],
}