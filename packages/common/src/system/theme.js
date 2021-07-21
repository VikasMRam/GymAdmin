/* eslint-disable key-spacing,no-multi-spaces */
import { makeColor, makeFont, makeCols, fonts } from './util';

import theme from 'sly/common/components/themes/default';

// const theme = {};

theme.breakpoint = {
  tablet           : 728,
  laptop           : 1080,
  desktop          : 1280,
};

// DO NOT MODIFY the following without asking Jared
theme.color = {
  slate      : makeColor('#121c2b'),
  primary    : makeColor('#1a7473'),
  viridian   : makeColor('#1a7473'),
  red        : makeColor('#d22626'),
  green      : makeColor('#008815'),
  yellow     : makeColor('#f1ab31'),
  blue       : makeColor('#186dc5'),
  harvest    : makeColor('#9f8352'),
  black      : makeColor('#000000'),
  white      : {
    base: '#fff',
  },
};

// new ways...
theme.fonts = {
  'title-xxl': makeFont(['36px/44px', '48px/60px'], 500, fonts.heading),
  'title-xl': makeFont(['32px/36px', '40px/48px'], 500, fonts.heading),
  'title-l': makeFont(['24px/32px', '32px/44px'], 500, fonts.heading),
  'title-m': makeFont(['20px/28px', '24px/36px'], 500, fonts.heading),
  'title-s': makeFont('18px/32px', 500, fonts.heading),
  'title-s-azo': makeFont('18px/32px', 500),
  'title-xs-azo': makeFont('16px/24px', 500),
  'body-l': makeFont('18px/32px'),
  'body-m': makeFont('16px/24px'),
  'body-s': makeFont('14px/20px'),
  'body-xs': makeFont('12px/16px'),
  label: {
    font: makeFont('12px/16px', 700, fonts.primary),
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  quote: makeFont('32px/44px'),
};


theme.clamped = {
  true:{
    whiteSpace:'nowrap',
    overflow:'hidden',
    textOverflow:'ellipsis',
  },
};


theme.fontSize = {
  'title-xxl': ['36px', '48px'],
  'title-xl': ['32px', '40px'],
  'title-l': ['24px', '32px'],
  'title-m': ['20px', '24px'],
  'title-s': '18px',
  'title-xs': '16px',
  'body-l': '18px',
  'body-m': '16px',
  'body-s': '14px',
  'body-xs': '12px',
};

theme.lineHeight = {
  'title-xxl': ['44px', '60px'],
  'title-xl': ['36px', '48px'],
  'title-l': ['32px', '44px'],
  'title-m': ['28px', '36px'],
  'title-s': '32px',
  'title-xs': '24px',
  'body-l': '32px',
  'body-m': '24px',
  'body-s': '20px',
  'body-xs': '16px',
};

theme.iconSize = {
  s: { size: '20px' },
  m: { size: '24px' },
  l: { size: '32px' },
  xl: { size: '40px' },
  xxl: { size: '48px' },
};

// FIXED: responsive values
theme.layout = {
  col1:         [makeCols(1 / 4, '1rem', 'vw'), '4.000rem'], // 64px
  col2:         [makeCols(2 / 4, '1rem', 'vw'), '9.500rem'], // 152px
  col3:         [makeCols(3 / 4, '1rem', 'vw'), '15.000rem'], // 240px
  // side column
  col4:         [makeCols(1, '1rem', 'vw'), '20.500rem'], // 328x
  col5:         '26.000rem', // 416px
  col6:         '31.500rem', // 504px
  col7:         '37.000rem', // 592px
  // main body column
  col8:       '42.500rem', // 680px
  col9:       '48.000rem', // 768px
  col10:      '53.500rem', // 856px
  col11:      '59.000rem', // 944px
  col12:      '64.500rem', // 1032px
  // laptop breakpoint has to fit: 24 margin + col12 + 24 margin = 1080
};

theme.space = {
  gutter:       ['1.000rem', '1.500rem'], // 24px

  // spacing
  xxxs    : '0.125rem',   // 2px
  xxs     : '0.250rem',   // 4px
  xs      : '0.500rem',   // 8px
  s       : '0.750rem',   // 12px
  m       : '1.000rem',   // 16px
  l       : '1.500rem',   // 24px
  xl      : '2.000rem',   // 32px
  xxl     : '3.000rem',   // 48px
  xxxl    : '5.000rem',   // 80px
};

theme.element = {
  // horizontal sizing in grid
  ...theme.layout,

  // vertical sizing hardcoded
  m: '3rem',    // 48px
  l: '3.5rem',  // 56px
  xl: '4rem',
  xxl: '4.5rem',
  xxxl: '5rem',
};


theme.border = {
  none: '0px',
  s: '1px solid',
  m: '2px solid',
  l: '4px solid',

  round: {
    border: '0px',
    borderRadius: 'xxs',
  },

  box: {
    border: 's',
    borderColor: 'slate.lighter-90',
    borderRadius: 'xxs',
  },
};

export default theme;

