module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    spacing: {
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
      12: '12px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      32: '32px',
      36: '36px',
      48: '48px',
      50: '50px',
      64: '64px',
      full: '100%',
    },
    fontSize: {
      12: '12px',
      14: '14px',
      16: '16px',
      40: '40px',
    },
    lineHeight: {
      none: 1,
      125: 1.25,
      140: 1.4,
    },
    fontFamily: {
      title: ['Niketo'],
      body: ['Karelia'],
    },
    colors: {
      transparent: 'transparent',
      black: 'black',
      white: '#fcfcfc',
      bnb: '#D9A21F',
      'page-active': 'var(--page-active-color, #fcfcfc)',
    },
    minWidth: {
      48: '48px',
      50: '50px',
      64: '64px',
    },
    backdropBlur: {
      4: '4px',
      8: '8px',
    },
    borderRadius: {
      full: '9999px',
      4: '4px',
      10: '10px',
      12: '12px',
      18: '18px',
    },
    extend: {},
  },
  plugins: [],
}
