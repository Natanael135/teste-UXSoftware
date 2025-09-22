/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C7B5D', // verde profundo
        secondary: '#6168A6', // azul arroxeado
        accent: '#F2A03D', // laranja quente
        background: '#F5F5F5', // cinza claro
        foreground: '#333333', // texto escuro
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
