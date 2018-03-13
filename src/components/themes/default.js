// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer';
import { key } from 'styled-theme';

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
  maxWidth:      '1100px',

  elements: {
    height: {
      regular: '2.500rem', 
      large:   '3.250rem',
      small:   '2.125rem',
    },

    border:    '0.063rem',
    borderRadius: {
      large:   '0.250rem',
      regular: '0.125rem',
    },
  },
        

  text: {
    hero:      '2.500rem',
    title:     '1.750rem',
    subtitle:  '1.125rem',
    body:      '1.000rem',
    caption:   '0.875rem',
  },
};

export function size(...args) {
  return key(['sizes', ...args]);
}

export default theme;
