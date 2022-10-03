/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'input-border': '#a1a1a1',
        'input-hover': '#c7ebdb',
        'input-hover-bg': '#f2f2f2',
        'vue-green': '#42b883',
        'gray-font': '#374151'
      }
    },
    screens: {
      mobile: { max: '600px' },
      tablet: { min: '601px' },
      laptop: '1024px'
    }
  },
  plugins: []
}
