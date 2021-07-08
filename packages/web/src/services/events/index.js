import { isServer, isTest, isProd } from 'sly/web/config';

import segment from './segment';
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
    }
  },

  track(event, options={}) {
    if (isServer || isTest) {
      return;
    }

    if (!isProd) {
      console.info('EVENT track', event);
    } else {
      segment.track(event);
      legacy.track(event);
      if (!options.notForGa) {
        ga.track(event);
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
      legacy.page();
      ga.page();
    }
  }
};

export const uuidActionEvent = (response) => {
  if (response.body.data) {
    const { id, attributes } = response.body.data;
    events.track({
      action: 'uuid',
      category: 'action',
      id,
      ...attributes,
    }, { notForGa: true });
  }
  return response;
};

export default events;

