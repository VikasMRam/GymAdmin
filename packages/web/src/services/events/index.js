import { isServer, isTest, isProd } from 'sly/web/config';

import segment from './segment';
//import rudder from './rudderstack';
import ga from './ga';
import legacy from './legacy';

global.SLY_EVENT_ENV = isProd
  ? 'production'
  : 'development';

const events = {
  identify(userId, userData) {
    if (isServer || isTest) {
      return;
    }

    if (!isProd) {
      console.info('EVENT identify', userId, userData);
    } else {
      segment.identify(userId, userData);
      //rudder.identify(userId, userData);
    }
  },

  track(...args) {
    if (isServer || isTest) {
      return;
    }

    if (!isProd) {
      console.info('EVENT track', ...args);
    } else {
      segment.track(...args);
      //rudder.track(...args);
      if (args.length === 1) {
        legacy.track(...args);
        ga.track(...args);
      }
    }
  },

  page() {
    if (isServer || isTest) {
      return;
    }

    if (!isProd) {
      const { pathname, search } = window.location;
      console.info('EVENT page', `${pathname}${search}`);
    } else {
      segment.page();
      //rudder.page();
      legacy.page();
      ga.page();
    }
  }
};

export default events;

