/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#13152A',
        darkBlueTransparent: 'rgba(19, 21, 42, 0.5)',
        burntOrange: '#AF6F25',
        burntOrangeTransparent: 'rgba(175, 111, 7, 0.5)',
        offWhite: '#F1F2EB',
        customGray: '#D8DAD3',
        transparentCustomGray: 'rgba(216, 218, 211, 0.5)',
        softGreen: '#A4C2A5',
        transparentSoftGreen: 'rgba(164, 194, 165, 0.5)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};

