import { reversePalette } from 'styled-theme/composer';

const theme = {};

theme.palette = {
  slate:     ['#384c57'],
  white:     ['#fff'],
  primary:   ['#2f8fcb', '#2483be', '#63abd8'],
  secondary: ['#7ccdcc', '#65c0bf', '#8bdbda', '#f4ffff'],
  grayscale: ['#8f9ca4', '#9ca8af', '#c5d0d5', '#f2f6f7'],
  danger:    ['#cc5663'],
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: 'Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
};

theme.sizes = {
  // pixel measurements
  breakpoint: {
    mobile:          '375px',
    tablet:          '768px',
    laptop:         '1024px',
    doubleModal:    '1200px',
    laptopLarge:    '1440px',
  },

  maxWidth:         '1200px',

  // rem measurements
  layout: {
    mainColumn:   '43.50rem', // 696px 
    sideColumn:   '21.00rem', // 336px 
  },

  modal: {
    single:       '35.25rem', // 564px
    double:       '70.50rem', // 1128px
  },

  collapsible: {
    small:        '10.00rem', // 160px
    regular:      '20.00rem', // 320px
    large:        '30.00rem', // 480px
  },

  element: {
    small:        '2.125rem', // 34px
    regular:      '2.500rem', // 40px
    large:        '3.000rem', // 48px
    xLarge:       '3.250rem', // 52px
  },

  slider: {
    knobWidth:    '1.125rem', // 18px
    knobHeight:   '2.250rem', // 36px
    knobMarginTop:'-1.125rem',//-18px
    valueWidth: {
      small:      '3.000rem', // 48px
      regular:    '6.000rem', // 96px
      large:      '9.000rem', // 144px
    }
  },

  tile: {
    small: {
      width:     '13.500rem',
      height:     '9.500rem',
    },
    smallSC: {
      width:    '16.875rem',
      height:    '11.25rem',
    },
    mediumSC: {
      width:    '21.4375rem',
      height:    '14.25rem',
    },
  },

  padding: {
    regular:   '0.5rem 1rem',
  },

  border:         '0.063rem', //  1px

  spacing: {
    nano:         '0.062rem', //  1px
    tiny:         '0.125rem', //  2px
    small:        '0.250rem', //  4px
    regular:      '0.500rem', //  8px
    large:        '1.000rem', // 16px
    xLarge:       '1.500rem', // 24px
    xxLarge:      '2.000rem', // 32px
    xxxLarge:     '3.000rem', // 48px
  },

  icon: {
    small:        '0.750rem', // 12px
    medium:       '1.000rem', // 16px
    regular:      '1.500rem', // 24px
    button:       '2.500rem', // 32px
    large:        '3.000rem', // 48px
    xLarge:       '6.000rem', // 96px
  },

  text: {
    caption:      '0.875rem', // 14px
    body:         '1.000rem', // 16px
    subtitle:     '1.125rem', // 18px
    title:        '1.750rem', // 28px
    hero:         '2.500rem', // 40px
  },

  lineHeight: {
    caption:           '1.4',
    body:              '1.5',
    subtitle:          '1.3',
    title:            '1.28',
    hero:              '1.2',
  },
};

theme.transitions = {
  fast: '0.1s ease-out',
  default: '0.2s ease-out',
};

export default theme;

