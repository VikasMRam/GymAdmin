import ReactGA from 'react-ga';
import { stringify } from 'query-string';

import { isServer, gAnalyticsKey, isProd, gaEnv } from 'sly/web/config';

import { getUUID } from './helpers';

global.SLY_EVENT_ENV = isProd
  ? 'production'
  : 'development';

export const objectToEventLabel = (obj) => {
  return stringify(obj, ';', ':');
};

function makeGa() {
  if (!isServer && isProd) {
    ReactGA.initialize(gAnalyticsKey);
    ReactGA.ga('require', 'displayfeatures');
    ReactGA.ga('set', 'dimension1', getUUID());
    ReactGA.ga('set', 'dimension3', gaEnv);
  }

  const ga = {
    page() {
      const { pathname, search } = window.location;
      const uri = `${pathname}${search}`;
      ReactGA.pageview(uri);
    },

    track({ action, category, label, value, nonInteraction }) {
      let gaLabel = label;

      if (value) {
        gaLabel += `:${value}`;
      }
      const gaEvent = {
        category,
        action,
        value,
        label: gaLabel,
        nonInteraction,
      };
      ReactGA.event(gaEvent);
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push(gaEvent);
      }
    },
  };

  return ga;
}

export default makeGa();
