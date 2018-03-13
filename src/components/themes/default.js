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
  maxWidth:         '1100px',

  text: {
    hero:          '2.5rem',
    title:        '1.75rem',
    subtitle:    '1.125rem',
    body:            '1rem',
    caption:      '0.875rem',
  },
};

export function size(...args) {
  return key(['sizes', ...args]);
}

export default theme;
