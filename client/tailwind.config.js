/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'input-placeholder': '#b3b3b3',
        'vue-green': '#42b883',
        'submit-button': '#2c3e50',
        'gradient-stop': '#b4e4ce',
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
