const addAlpha = (color, opacity = 1) => {
  return (
    color +
    Math.round(Math.min(Math.max(opacity, 0), 1) * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')
  )
}

const colors = {
  transparent: 'transparent',
  gray: {
    300: '#1A1A1A',
    400: '#151515',
    500: '#6C7479',
    600: '#525C67',
    700: '#333333',
    800: '#1A1A1A',
  },
  'green-atomic': '#40E7FF',
  'green-original': '#36C692',
  black: 'black',
  red: {
    400: '#E13535',
    500: '#D42727',
    600: '#CF1E1E',
  },
  white: '#fcfcfc',
  bnb: '#D9A21F',
  violet: {
    400: '#7A21FF',
    500: '#6D0DFC',
    600: '#650BEB',
  },
  yellow: {
    500: '#F2D700',
  },
  pink: '#FF36DF',
  orange: '#D9A21F',
}

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
      'ui-page-inner-spacing': 'var(--ui-page-inner-spacing)',
      'ui-page-header-spacing': 'calc(var(--app-ui-header-height) + var(--app-ui-header-offset))',
      'ui-page-header-size': 'var(--app-ui-header-height)',
      'ui-page-bottom-spacing': 'calc(var(--app-ui-bottom-nav-height, 0px) + var(--app-ui-bottom-nav-offset, 42px))',
      full: '100%',
      '100vh': '100vh',
      '100vw': '100vw',
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
      24: '24px',
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
      192: 1.92,
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
      yellow: {
        DEFAULT: colors.yellow['500'],
        ...colors.yellow,
      },
      pink: colors.pink,
      gray: {
        DEFAULT: colors.gray['500'],
        ...colors.gray,
      },
      orange: colors.orange,
    },
    minWidth: {
      40: '40px',
      48: '48px',
      50: '50px',
      64: '64px',
      104: '104px',
    },
    minHeight: {
      24: '24px',
      32: '32px',
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
    },
    zIndex: {
      header: 1001,
      'mobile-menu': 1000,
      'bg-content': 0,
      modal: 1100,
      toast: 1200,
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
        500: '500px',
        600: '600px',
        875: '875px',
        420: '420px',
        375: '375px',
        320: '320px',
      },
      backgroundImage: {
        'green-original-gradient': `linear-gradient(${addAlpha(colors['green-original'], 0.15)}, ${addAlpha(
          colors['green-original'],
          0,
        )})`,
        'green-atomic-gradient': `linear-gradient(${addAlpha(colors['green-atomic'], 0.15)}, ${addAlpha(
          colors['green-atomic'],
          0,
        )})`,
        'white-lazurit-gradient': 'linear-gradient(100deg, #FFFFFF -10%, #DDECFA 45%, #F7FDFF 96%)',
      },
    },
  },
}
