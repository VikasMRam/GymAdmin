import ReactGA from 'react-ga';
import { Cookies } from 'react-cookie';
import { stringify } from 'query-string';

import { isServer, isTest, gAnalyticsKey, eventServerUrl, isDev, gaEnv } from 'sly/config';

const cookie = new Cookies();
export default class SlyEvent {
  static seInstance = null;

  static getInstance() {
    if (this.seInstance === null) {
      this.seInstance = new SlyEvent();
      if (!isTest) {
        ReactGA.initialize(gAnalyticsKey);
        const ga = ReactGA.ga();
        ga('require', 'displayfeatures');
        ga('set', 'dimension1', cookie.get('sly_uuid'));
        ga('set', 'dimension3', gaEnv);
      }
    }
    return this.seInstance;
  }

  address = eventServerUrl;
  uuid = cookie.get('sly_uuid');
  sid = cookie.get('sly_sid');
  ga = null;

  sendPageView(path, search = '') {
    if (isServer) {
      return;
    }

    const uri = `${path}${search}`;

    const se = {
      a: 'view',
      c: path,
      p: uri,
      u: this.uuid,
      s: this.sid,
      t: Date.now(),
    };

    if (isDev || isTest) {
      console.info('EVENT pageview', uri);
    } else {
      fetch(`${eventServerUrl}?${stringify(se)}`);
      ReactGA.pageview(uri);
    }
  }

  sendEvent(event) {
    if (isServer || isTest) {
      return;
    }

    let { action, category, label, value, nonInteraction } = event;

    const se = {
      a: action,
      c: category,
      l: label,
      v: value,
      p: window.location.pathname,
      u: this.uuid,
      s: this.sid,
      t: Date.now(),
    };

    let gaLabel = label;

    if (value) {
      gaLabel += `:${value}`;
    }

    if (category == null) {
      category = window.location.pathname + window.location.hash.split('?')[0];
    }

    const gaEvent = {
      category,
      action,
      value,
      label: gaLabel,
      nonInteraction,
    };

    if (isDev) {
      console.info('EVENT event', gaEvent);
    } else {
      fetch(`${eventServerUrl}?${stringify(se)}`);
      ReactGA.event(gaEvent);
      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push(gaEvent);
      }
    }
  }
}


// TODO Add more methods for sending timing and non interactive i events.
