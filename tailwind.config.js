/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        pageblack: '#020202',
        gold: 'rgb(157 109 66)'
      },
      animation: {
        fadeRight: 'fadeKeyRight .5s ease-out',
        fadeTop: 'fadeKeyTop .5s ease-out'
      },
      keyframes: {
        fadeKeyRight: {
          '0%': { transform: 'translateX(4rem)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeKeyTop: {
          '0%': { transform: 'translateY(-4rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }

    }
  },
  plugins: []
}
