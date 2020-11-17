/* eslint-disable key-spacing,no-multi-spaces */
import theme from './index.common';

theme.defaultImageSources = [
  320,
  375,
  416,  // our mobile
  768,  // our tablet
  1080, // our tablet
  1200, // our max
];

const addImageSource = (source) => {
  const srcs = [...theme.defaultImageSources];
  let index = srcs.findIndex(x => x > source);
  if (index === -1) index = srcs.length;
  srcs.splice(index, 0, source);
  return srcs;
};

theme.imageFormats = {
  heroGallery: { sizes: '(max-width: 1079px) 100vw, 680px', sources: addImageSource(680) },
  fullscreenGallery: { sizes: '(max-width: 1199px) 100vw, 1200px' },
  thumbGallery: { sizes: '129px', sources: [[129, 86], [258, 172]] },
  searchResults: { sizes: '(max-width: 767px) calc(100vw - 1.5rem), 180px', sources: addImageSource(180) },
  howItWorks: { sizes: '(max-width: 549px) calc(100vw - 2rem), calc(550px - 2rem)', sources: addImageSource(550) },
};

theme.sizes = {
  ...theme.sizes,

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
          tablet     : '5rem',      // 80px
          laptop     : '4rem',     // 64px
        },
      },
    },
    home: {
      heroSearchBox: {
        width: '32rem',   // 512px
      },
      heroImage: {
        height: '40rem',   // 640px
        mobileHeight: '30rem', // 480px
      },
    },
    hub: {
      heroSearchBox: {
        width: '20rem',   // 360px
      },
      heroImage: {
        height: '30rem',   // 640px
        mobileHeight: '40rem', // 480px
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
  stickySections     : 1000,
  header             : 10001,
  searchSuggestions  : 10002,
  notifications      : 10003,
  savedCommunityPopup: 10005,
};

export default theme;
