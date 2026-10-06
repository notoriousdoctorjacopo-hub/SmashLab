/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        coal: '#141010',
        neon: '#FF1E2D',
        volt: '#FFE600',
        blaze: '#FF6A00',
        logo: '#F7931E',
        bone: '#F2EFE9',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['Archivo', 'system-ui', 'sans-serif'],
        marker: ['"Permanent Marker"', 'cursive'],
      },
      transitionTimingFunction: {
        back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
