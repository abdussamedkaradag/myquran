/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#F5F5F0',
          200: '#E7D3C6',
          300: '#D3B8AE',
          400: '#B38B7D',
          500: '#8B5E3C',
          600: '#5A3E36',
          700: '#3D2B24',
          800: '#2B1E1A',
        },
        white: '#FFFFFF',
        gray: {
          400: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
} 