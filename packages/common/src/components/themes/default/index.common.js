/* eslint-disable key-spacing,no-multi-spaces */
import { isBrowser, isDev } from 'sly/web/config';
import { makeColor, makeColorTable } from 'sly/common/components/themes/color';

const theme = {};

// Color variations are:
// whole filler stroke background of white tint
//  100%    33%    15%         8%
// dark is 15% more of black tint in the palette
// not all of the variations should be used,
// see below comments or in storybook
// DO NOT MODIFY the following without asking Jared
theme.palette = {
  slate      : makeColor('#253348'),
  primary    : makeColor('#1a7473'),
  secondary  : makeColor('#56c4c2'),
  white      : makeColor('#ffffff'),
  danger     : makeColor('#dc3133'),
  warning    : makeColor('#f3c150'),
  green      : makeColor('#4fb75f'),
  grey       : makeColor('#70767E'),
  yellow     : makeColor('#f3c150'),
  magenta    : makeColor('#6d27ca'),
  orange     : makeColor('#F99106'),
  razzmatazz : makeColor('#F40767'),
  blue       : makeColor('#186DC5'),
};

if (isBrowser && isDev) {
  console.table(makeColorTable(theme.palette));
}

theme.fonts = {
  primary: 'Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre    : 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote  : 'Georgia, serif',
};

theme.sizes = {
  // pixel measurements
  // use mobile only in special cases
  // mobile, fluid: 0 to 416, centered
  // mobile, fixed: 0 to 768
  // tablet: 768 to 1080
  // desktop: 1080 onwards
  breakpoint: {
    mobile           : '416px',
    tablet           : '768px',
    laptop           : '1080px',
    desktop          : '1280px',
  },

  // only for tablet and wider
  layout: {
    gutter:      '1.500rem', // 24px

    col1:        '4.000rem', // 64px
    col2:        '9.500rem', // 152px
    col3:       '15.000rem', // 240px
    // side column
    col4:       '20.500rem', // 328x
    col5:       '26.000rem', // 416px
    col6:       '31.500rem', // 504px
    col7:       '37.000rem', // 592px
    // main body column
    col8:       '42.500rem', // 680px
    col9:       '48.000rem', // 768px
    col10:      '53.500rem', // 856px
    col11:      '59.000rem', // 944px
    col12:      '64.500rem', // 1032px
    // laptop breakpoint has to fit: 24 margin + col12 + 24 margin = 1080
  },

  // tablet measures are not based on our unit (16px, 1rem)
  tabletLayout: {
    gutter:     '1.500rem', // 24px
    col1:       '69px',
    col2:       '162px',
    col3:       '255px',
    col4:       '348px',
    col5:       '441px',
    col6:       '534px',
    col7:       '627px',
    col8:       '720px',
    // tablet breakpoint fits 24 margin + col8 + 24 margin = 768px, 48rem
  },

  // mobile measure are rem compatible TODO: fix numbers
  mobileLayout: {
    gutter:     '1.000rem', // 16px

    col1:       '5.250rem',
    col2:      '11.500rem',
    col3:      '17.750rem',
    col4:      '24.000rem',
    // mobile breakpoint has to fit 16 margin + col4 + 16 margin = 416px, 26rem
  },

  collapsible: {
    tiny   : '5.000rem',   //  80px
    small  : '10.00rem',   // 160px
    regular: '20.00rem',   // 320px
    large  : '30.00rem',   // 480px
  },

  element: {
    tag     : '1.500rem',   // 24px
    tiny    : '1.750rem',   // 28px
    small   : '2.250rem',   // 36px
    regular : '2.500rem',   // 40px
    button  : '2.750rem',   // 44px
    large   : '3.000rem',   // 48px
    xLarge  : '3.250rem',   // 52px
    xxLarge : '4.500rem',   // 72px
    xxxLarge: '5.000rem',   // 80px
    huge    : '6.000rem',   // 96px
    xHuge   : '7.500rem',   // 120px
    xxHuge  : '9.000rem',   // 144px
    xxxHuge : '9.500rem',   // 152px
  },

  slider: {
    knobWidth    : '1.125rem',    // 18px
    knobHeight   : '2.250rem',    // 36px
    knobMarginTop: '-1.125rem',   // -18px
    valueWidth   : {
      small  : '3.000rem',   // 48px
      regular: '6.000rem',   // 96px
      large  : '9.000rem',   // 144px
    },
  },

  padding: {
    regular: '0.5rem 1rem',
  },

  border: {
    none: '0px',
    regular: '0.062rem',   // 1px
    large  : '0.125rem',   // 2px
    xLarge : '0.1875rem',  // 3px
    xxLarge: '0.250rem',   // 4px
  },

  spacing: {
    nano    : '0.062rem',   //  1px
    tiny    : '0.125rem',   //  2px
    small   : '0.250rem',   //  4px
    regular : '0.500rem',   //  8px
    medium  : '0.750rem',   // 12px
    large   : '1.000rem',   // 16px
    xLarge  : '1.500rem',   // 24px
    xxLarge : '2.000rem',   // 32px
    xxxLarge: '3.000rem',   // 48px
    huge    : '4.000rem',   // 64px
    massive : '4.500rem',   // 72px
  },

  text: {
    micro     : '0.625rem',   // 10px
    tiny      : '0.750rem',   // 12px
    caption   : '0.875rem',   // 14px
    body      : '1.000rem',   // 16px
    subtitle  : '1.250rem',   // 20px
    title     : '1.750rem',   // 28px
    hero      : '2.250rem',   // 36px
    superHero : '3.000rem',   // 48px
    xxLarge   : '4.500rem',   // 72px
  },

  lineHeight: {
    nano     : '0.8',
    micro    : '1.2',    // 12px / 10px
    tiny     : '1.167',  // 14px / 12px
    caption  : '1.429',  // 20px / 14px
    body     : '1.5',    // 24px / 16px
    subtitle : '1.3',    // 26px / 20px
    title    : '1.29',   // 36px / 28px
    hero     : '1.33',   // 48px / 36px
    superHero:'1.33',    // 64px / 48px
    xxLarge  : '1.0',    // 72px / 72px
  },

  weight: {
    light:    '300',
    regular:  '400',
    medium:   '500',
    bold:     '700',
  },

  /** *******************************************
   * FIXME: all things below should be calculated
   * from available space
   ******************************************** */

  filtersMenu: {
    width: {
      mobile: '23.4375rem',   // 375px
      laptop: '15.375rem',    // 246px
    },
  },

  tile: {
    tiny: {
      width : '7rem',        // 112px
      height: '5.25rem',     // 84px
    },
    little: {
      width:  '12rem',       // 192px
      height: '8rem',        // 128px
    },
    small: {
      width : '13.500rem',   // 216px
      height: '9.500rem',    // 152px
    },
    regular: {
      width : '16.875rem',   // 270px
      height: '11.125rem',   // 178px
    },
    large: {
      width : '21.4375rem',   // 343px
      height: '14.25rem',     // 228px
    },
  },

  // TODO: this section should be moved to imageFormats
  picture: {
    tiny: {
      width: '9.375rem',   // 150px
      height: '4.5rem',    // 72 px
    },
    small: {
      width : '15.375rem',   // 246px
      height: '11.25rem',    // 180px
    },
    regular: {
      width : '21rem',       // 336px
      height: '15.625rem',   // 250px
    },
    large: {
      width : '21.4375rem',   // 343px
      height: '15.625rem',    // 250px
    },
    xLarge: {
      width : '32.25rem',   // 516px
      height: '17.5rem',    // 280px
    },
    xxLarge: {
      width : '32.25rem',   // 516px
      height: '21.4375rem', // 343px
    },
    ratios: {
      '16:9': '56.25%',
      golden: '61.80%',
      '3:2':  '66.66%',
      '4:3' : '75%',
      '1:1' : '100%',
    },
  },

  plus: {
    image: {
      height: '30rem',
    },
    left: {
      default: '1.0rem',
      tablet:  '22.5rem',
      laptop: '31.75rem',
    },
  },

  thumbnail: {
    width : '8.0625rem',   // 129px
    height: '5.375rem',    // 86px
  },

  dashboard: {
    actionFooterBottomMargin: '3.0rem',
  },
};

export default theme;
