/* eslint-disable key-spacing,no-multi-spaces */
import { makeColor, makeColorTable } from './color';

import { isTest } from 'sly/config';


export { colorIndex } from './color';

const theme = {};

// Color variations are:
// whole accent filler stroke background
//  100%    67%    33%    15%         4%
// not all of the variations should be used,
// see below comments or in storybook
// DO NOT MODIFY the following without asking Jared
theme.palette = {
  slate    : makeColor('#2a333f', ['base', 'accent', 'filler', 'stroke', 'background', 'dark']),
  grey     : makeColor('#70767E', ['base', 'accent', 'filler', 'stroke', 'background']),
  primary  : makeColor('#186dc5', ['base',           'filler', 'stroke',               'dark']),
  secondary: makeColor('#56c4c2', ['base',           'filler', 'stroke',               'dark']),
  white    : makeColor('#ffffff', ['base']),
  danger   : makeColor('#dc3133', ['base',                     'stroke',               'dark']),
  warning  : makeColor('#f3c150', ['base',                     'stroke',               'dark']),
  green    : makeColor('#4FB75F', ['base',                                             'dark']),
};

if (!isTest) console.table(makeColorTable(theme.palette));

theme.fonts = {
  primary: 'Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre    : 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote  : 'Georgia, serif',
};

theme.sizes = {
  // pixel measurements
  breakpoint: {
    mobile           : '375px',
    tablet           : '720px',
    laptop           : '1080px',
  },

  // only for tablet and wider
  layout: {
    gutter:      '1.500rem', // 24px

    col1:        '4.125rem', // 66px
    col2:        '9.750rem', // 156px
    col3:       '15.375rem', // 246px
    // side column
    col4:       '21.000rem', // 336px
    col5:       '26.625rem', // 426px
    col6:       '32.250rem', // 516px
    col7:       '37.875rem', // 606px
    // main body column
    col8:       '43.500rem', // 696px
    col9:       '49.125rem', // 786px
    col10:      '54.750rem', // 876px
    col11:      '60.375rem', // 966px
    // max page width
    col12:      '66.000rem', // 1056px
  },

  mobileLayout: {
    gutter:      '1.000rem', // 16px

    col1:        '5.000rem', // 80px
    col2:       '11.000rem', // 176px
    col3:       '17.000rem', // 272px
    col4:       '23.000rem', // 368px

    col5:       '29.000rem', // 464px
    col6:       '35.000rem', // 560px
    col7:       '41.000rem', // 656px
    col8:       '47.000rem', // 752px

    col9:       '53.000rem', // 848px
    col10:      '59.000rem', // 944px
  },

  modal: {
    single : '35.25rem',   // 516px
    double : '55rem',      // 880px
    gallery: '54.75rem',   // 876px
  },

  header: {
    SearchBox: {
      width: '22.5rem',   // 360x
    },
    menu: {
      width   : '16.5rem',   // 264px
      position: {
        top: {
          mobile     : '3.8125rem',   // 61px
          laptop     : '3.4375rem',   // 55px
        },
      },
    },
    home: {
      heroSearchBox: {
        width: '30rem',   // 480px
      },
      heroImage: {
        height: '40rem',   // 640px
        mobileHeight: '30rem', // 480px
      },
    },
  },

  home: {
    companiesWeTrust: {
      width: '33.625rem',   // 538px
    },
    introMargin: '4.8125rem', // 77px
  },

  filtersMenu: {
    width: {
      mobile: '23.4375rem',   // 375px
      laptop: '15.375rem',    // 246px
    },
  },

  collapsible: {
    tiny   : '5.000rem',   //  80px
    small  : '10.00rem',   // 160px
    regular: '20.00rem',   // 320px
    large  : '30.00rem',   // 480px
  },

  element: {
    small   : '2.000rem',   // 34px
    regular : '2.500rem',   // 40px
    large   : '3.000rem',   // 48px
    xLarge  : '3.250rem',   // 52px
    xxLarge : '4.500rem',   // 72px
    xxxLarge: '5.000rem',   // 80px
    huge    : '6.000rem',   // 96px
    xHuge    : '7.500rem',   // 120px
    xxHuge    : '9.000rem',   // 144px
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

  // FIXME: remove this tiles should expand in avail space
  tile: {
    tiny: {
      width : '7rem',        // 112px
      height: '5.25rem',     // 84px
    },
    little: {
      width:  '10.9375rem',  // 175px
      height: '7.375rem',    // 118px
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

  // FIXME: remove this images should expand in avail space
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
      golden: '61.803398875%',
      '3:2':  '66.66%',
      '4:3' : '75%',
    },
  },

  map: {
    propertyDetail: {
      small: {
        width : '343px',   // 343px
        height: '198px',   // 198px
      },
      regular: {
        width : '696px',   // 696px
        height: '401px',   // 401px
      },
      large: {
        width : '1056px',   // 1056px
        height: '607px',    // 607px
      },
    },
    search: {
      tiny: {
        width : '13.375rem',   // 214px
        height: '7rem',        // 112px
      },
      small: {
        width : '343px',   // 343px
        height: '198px',   // 198px
      },
      regular: {
        width : '696px',   // 696px
        height: '800px',   // 800px
      },
      large: {
        width : '1056px',   // 1056px
        height: '1056px',   // 1056px
      },
    },
  },

  padding: {
    regular: '0.5rem 1rem',
  },

  border: {
    regular: '1px',   // 1px
    large  : '2px',   // 2px
    xLarge : '3px',   // 3px
    xxLarge: '4px',   // 4px
  },

  spacing: {
    nano    : '0.062rem',   //  1px
    tiny    : '0.125rem',   //  2px
    small   : '0.250rem',   //  4px
    regular : '0.500rem',   //  8px
    large   : '1.000rem',   // 16px
    xLarge  : '1.500rem',   // 24px
    xxLarge : '2.000rem',   // 32px
    xxxLarge: '3.000rem',   // 48px
    huge    : '4.000rem',   // 64px
    massive : '4.500rem',   // 72px
  },

  icon: {
    tiny   : '0.750rem',   // 12px
    small  : '1.000rem',   // 16px
    regular: '1.500rem',   // 24px
    large  : '2.250rem',   // 36px
    xLarge : '3.000rem',   // 48px
    xxLarge: '4.500rem',   // 72px
  },

  text: {
    tiny    : '0.750rem',   // 12px
    caption : '0.875rem',   // 14px
    body    : '1.000rem',   // 16px
    subtitle: '1.125rem',   // 18px TODO: clarify whether it's 20px in new theme
    title   : '1.750rem',   // 28px
    hero    : '2.500rem',   // 40px
  },

  lineHeight: {
    tiny    : '1.167',
    caption : '1.4',
    body    : '1.5',
    subtitle: '1.3',
    title   : '1.28',
    hero    : '1.2',
    minimal : '1.125',
  },

  carousel: {
    mobile: '15.625rem',   // 250px
    tablet: '28.750rem',   // 460px
  },

  thumbnail: {
    width : '8.0625rem',   // 129px
    height: '5.375rem',    // 86px
  },
};

theme.transitions = {
  fast   : '0.1s ease-out',
  default: '0.2s ease-out',
  slow   : {
    in   : '.4s ease-in',
    out  : '.4s ease-out',
    inOut: '.4s ease-in-out',
  },
};

theme.animations = {
  default: '0.2s',
  slow   : '0.4s',
};

theme.zIndexes = {
  modal: {
    overlay             : 10000,
    galleryLayoutHeading: 10001,
  },
  stickySections     : 10000,
  header             : 10001,
  searchSuggestions  : 10002,
  notifications      : 10003,
  savedCommunityPopup: 10005,
};

// timeout to hide toast notifications, in milliseconds
theme.toastNotificationTimeout = 30000;

export default theme;
