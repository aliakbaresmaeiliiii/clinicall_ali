/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
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

    extend: {
      zIndex: {
        '1': '1',
      }
    },

  },
  plugins: [],
}