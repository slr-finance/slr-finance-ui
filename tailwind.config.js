const plugin = require('tailwindcss/plugin')
const colors = require('./colors')

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
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      48: '48px',
      50: '50px',
      64: '64px',
      72: '72px',
      80: '80px',
      'ui-page-spacing': 'var(--ui-page-spacing)',
      'ui-page-header-spacing': 'calc(var(--app-ui-header-height) + var(--app-ui-header-offset))',
      'ui-page-bottom-spacing': 'calc(var(--app-ui-bottom-nav-height, 0px) + var(--app-ui-bottom-nav-offset, 42px))',
      full: '100%',
    },
    fontSize: {
      8: '8px',
      9: '9px',
      11: '11px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      28: '28px',
      38: '38px',
      40: '40px',
      'ui-page-title': 'var(--ui-page-title-size)',
      'ui-page-description': 'var(--ui-page-description-size)',
      'ui-page-label': 'var(--ui-page-label-size)',
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
      transparent: colors.transparent,
      'green-atomic': colors['green-atomic'],
      'green-original': colors['green-original'],
      black: colors.black,
      red: {
        DEFAULT: colors.red['500'],
        ...colors.red,
      },
      white: colors.white,
      bnb: colors.bnb,
      violet: {
        DEFAULT: colors.violet['500'],
        ...colors.violet,
      },
      yellow: colors.yellow,
      pink: colors.pink,
      gray: {
        DEFAULT: colors.gray['500'],
        ...colors.gray,
      },
    },
    minWidth: {
      40: '40px',
      48: '48px',
      50: '50px',
      64: '64px',
    },
    minHeight: {
      24: '24px',
      full: '100%',
    },
    backdropBlur: {
      4: '4px',
      8: '8px',
    },
    borderRadius: {
      full: '9999px',
      4: '4px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
    },
    aspectRatio: {
      auto: 'auto',
      1: '1/1',
      'pool-video': '125 / 108',
      'pool-video-gradient': '25 / 54',
      'referral-bg-video': '20 / 27',
    },
    zIndex: {
      header: 1001,
      'mobile-menu': 1000,
      'bg-video': 0,
      modal: 1100,
      'ui-page-content': 1,
      1: 1,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
    },
    extend: {
      screens: {
        600: '600px',
        875: '875px',
        375: '375px',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const gradients = {
        '.gradient-white-lazurit': {
          background: 'linear-gradient(100.54deg, #FFFFFF -9.95%, #DDECFA 45.39%, #F7FDFF 96.31%)',
        },
      }

      addUtilities(gradients, ['responsive'])
    }),
  ],
}
