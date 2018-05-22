import ReactGA from 'react-ga';
import cookie from 'react-cookie';
import { stringify } from 'query-string';
import { isServer, gAnalyticsKey, eventServerUrl } from 'sly/config';

export default class SlyEvent {
  static seInstance = null;
  address = eventServerUrl;
  uuid = cookie.load('sly_uuid');
  sid = cookie.load('sly_sid');
  ga = null;

  static getInstance() {
    if (this.seInstance === null) {
      this.seInstance = new SlyEvent();
      ReactGA.initialize(gAnalyticsKey);
    }
    return this.seInstance;
  }

  sendPageView(path) {
    if (isServer) {
      return;
    }

    const se = {
      a: 'view',
      c: path,
      p: path,
      u: this.uuid,
      s: this.sid,
      t: Date.now(),
    };

    fetch(`${eventServerUrl}?${stringify(se)}`);
    ReactGA.pageview(path);
  }

  sendEvent(event) {
    if (isServer) {
      return;
    }

    let {
      action, category, label, value,
    } = event;
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

    fetch(`${eventServerUrl}?${stringify(se)}`);
    if (category == null) {
      category = window.location.pathname + window.location.hash.split('?')[0];
    }
    ReactGA.event({
      category,
      action,
      label,
      value,

    });
  }
}


// TODO Add more methods for sending timing and non interactive i events.
