/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 4px -2px rgba(24, 39, 75, 0.08), 0px 2px 4px -2px rgba(24, 39, 75, 0.12)',
      },
      colors: {
        excellentA: '#B81414',
        excellentB: '#EC3B3B',
        goodA: '#03C75A',
        goodB: '#64A882',
        normalA: '#E2E8F0',
        normalB: '#D2D2D2',
      },
      backgroundColor: {
        'foreground-rgb': '0, 0, 0',
        'gradient-black': 'linear-gradient(180deg, #35393e 0%, #050810 74.42%)',
        'gradient-red': 'linear-gradient(180deg, #bf1616 0%, #ae0f0f 74.42%)',
        excellentA: '#B81414',
        excellentB: '#EC3B3B',
        goodA: '#03C75A',
        goodB: '#64A882',
        normalA: '#E2E8F0',
        normalB: '#D2D2D2',
        bad: '#CCD0D6',
        'pri-color': '#5271ff',
        gray: '#bcbcbc',
        'dark-gray': '#6a6a65',
      },
      textColor: {
        'pri-color': '#5271ff',
      },
      letterSpacing: {
        tighter: '-0.09px',
      },
      spacing: {
        6.5: '26px',
        18: '72px',
        34: '136px',
        7.5: '30px',
        0.5: '2px',
      },
      screens: {
        customNav: '740px',
        tableDOB: '912px',
        tableAP: '740px',
        tableSalary: '640px',
      },
      width: {
        93: '372px',
        table: '100px',
        name: '240px',
        127.5: '510px',
        170: '170px',
      },
      height: {
        28.5: '114px',
        86: '86px',
        13.5: '54px',
        42: '42px',
        16: '64px',
      },
      lineHeight: {
        150: '150.687%',
        125: '124.836%',
      },
      fontSize: {
        48: '48px',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.horizontal-text': {
          writingMode: 'horizontal-tb',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
