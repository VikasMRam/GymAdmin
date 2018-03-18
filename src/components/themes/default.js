// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer';

const theme = {};

theme.palette = {
  primary:   ['#2f8fcb', '#80bae1', '#007fb6'],
  secondary: ['#7ccdcc', '#aee1e0', '#4fb4b3'],
  danger:    ['#c54e5b', '#dd939b', '#a92f42'],
  white:     ['#e7edef', '#f3f5f6', '#ffffff'],
  grayscale: ['#384c57', '#9ca8af', '#c6d0c5'],
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: 'Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
};

theme.sizes = {
  maxWidth:         '1100px',

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
    }
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
    regular:      '1.500rem', // 24px
    large:        '3.000rem', // 48px
  },

  text: {
    caption:      '0.875rem', // 14px
    body:         '1.000rem', // 16px
    subtitle:     '1.125rem', // 18px
    title:        '1.750rem', // 28px
    hero:         '2.500rem', // 40px
  },
};

export default theme;

