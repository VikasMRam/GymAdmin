import ReactGA from 'react-ga';
import cookie from 'react-cookie';
import { stringify } from 'query-string';
import { isServer, isTest, gAnalyticsKey, eventServerUrl, isDev } from 'sly/config';

export default class SlyEvent {
  static seInstance = null;

  static getInstance() {
    if (this.seInstance === null) {
      this.seInstance = new SlyEvent();
      if (!isTest) {

        ReactGA.initialize(gAnalyticsKey);
        let ga = ReactGA.ga();
        ga('require', 'displayfeatures');
        ga('set', 'dimension1',cookie.load('sly_uuid'));
      }
    }
    return this.seInstance;
  }

  address = eventServerUrl;
  uuid = cookie.load('sly_uuid');
  sid = cookie.load('sly_sid');
  ga = null;

  sendPageView(path, search='') {
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

    let { action, category, label, value } = event;

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

    if (category == null) {
      category = window.location.pathname + window.location.hash.split('?')[0];
    }

    const gaEvent = {
      category,
      action,
      value,
      label: `${label}:${value}`,
    };

    if (isDev) {
      console.info('EVENT event', gaEvent);
    } else {
      fetch(`${eventServerUrl}?${stringify(se)}`);
      ReactGA.event(gaEvent);
      if (typeof window.dataLayer !== 'undefined'){
        window.dataLayer.push(gaEvent);
      }
    }
  }
}


// TODO Add more methods for sending timing and non interactive i events.
