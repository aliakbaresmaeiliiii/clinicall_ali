// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      config: './tailwindcss.config.js',
    }),
    require('autoprefixer'),
  ],
};
