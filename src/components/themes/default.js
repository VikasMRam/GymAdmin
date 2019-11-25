/* eslint-disable key-spacing,no-multi-spaces */
import { makeColor } from './color';

export { colorIndex } from './color';

const theme = {};

// Color variations are:
// whole filler stroke background of white tint
//  100%    33%    15%         8%
// dark is 15% more of black tint in the palette
// not all of the variations should be used,
// see below comments or in storybook
// DO NOT MODIFY the following without asking Jared
theme.palette = {
  slate    : makeColor('#2a333f', ['dark', 'base', 'filler', 'stroke']),
  primary  : makeColor('#186dc5', ['dark', 'base', 'filler', 'stroke', 'background']),
  secondary: makeColor('#56c4c2', ['dark', 'base', 'filler', 'stroke', 'background']),
  white    : makeColor('#ffffff', ['base']),
  danger   : makeColor('#dc3133', ['dark', 'base', 'filler', 'stroke']),
  warning  : makeColor('#f3c150', ['dark', 'base', 'filler', 'stroke']),
  green    : makeColor('#4fb75f', ['dark', 'base', 'filler', 'stroke']),
  grey     : makeColor('#70767E', ['dark', 'base', 'filler', 'stroke', 'background']),
  yellow   : makeColor('#f3c150', ['dark', 'base', 'filler', 'stroke', 'background']),
  pink     : makeColor('#9a268e', ['dark', 'base', 'filler', 'stroke', 'background']),
  purple   : makeColor('#6d27ca', ['dark', 'base', 'filler', 'stroke', 'background']),
};

// if (isDev && isBrowser && !isTest) console.table(makeColorTable(theme.palette));

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
  },

  image: {
    heroGallery: {
      ratio: '3:2',
      sizes: [320, 375, 425, 768, 1024, 1440],
    },
  },

  // images: {
  //   hero: { width: 1080, height: 512 },
  //   column: { width: }
  // },

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
    medium  : '0.750rem',   // 12px
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
    caption: '1.250rem',   // 20px for use with caption text
    regular: '1.500rem',   // 24px
    large  : '2.250rem',   // 36px
    xLarge : '3.000rem',   // 48px
    xxLarge: '4.500rem',   // 72px
  },

  text: {
    micro   : '0.625rem',   // 10px
    tiny    : '0.750rem',   // 12px
    caption : '0.875rem',   // 14px
    body    : '1.000rem',   // 16px
    subtitle: '1.250rem',   // 20px
    title   : '1.750rem',   // 28px
    hero    : '2.250rem',   // 36px
  },

  lineHeight: {
    micro    : '1.2',    // 12px/10px
    tiny    : '1.167',
    caption : '1.429',
    body    : '1.5',
    subtitle: '1.3',
    title   : '1.28',
    hero    : '1.33',
    minimal : '1.125',
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

  header: {
    SearchBox: {
      width: '22.5rem',   // 360x
    },
    menu: {
      width   : '16.5rem',   // 264px
      position: {
        top: {
          mobile     : '3.8125rem',     // 61px
          tablet     : '5.08rem',      // 81px
          laptop     : '4rem',        // 64px
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
    agents: {
      heroImage: {
        height: '30rem', // 480px
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

  carousel: {
    mobile: '15.625rem',   // 250px
    tablet: '28.750rem',   // 460px
  },

  thumbnail: {
    width : '8.0625rem',   // 129px
    height: '5.375rem',    // 86px
  },

  chatBox: {
    footerReachedBottomMargin       : '3.75rem',   // 60px
    pageWithStickyFooterBottomMargin: '6.25rem',   // 100px
  },

  dashboard: {
    actionFooterBottomMargin: '3.0rem',
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

export default theme;
