exports.addAlpha = (color, opacity = 1) => {
  return (
    color +
    Math.round(Math.min(Math.max(opacity, 0), 1) * 255)
      .toString(16)
      .toUpperCase()
      .padStart(2, '0')
  )
}

exports.colors = {
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
