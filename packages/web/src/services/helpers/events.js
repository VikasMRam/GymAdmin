import ReactGA from 'react-ga';
import { Cookies } from 'react-cookie';
import { stringify, parse } from 'query-string';
import { v4 } from 'uuid';

import { randomHexNumber } from './utils';

import { domain, isServer, isTest, gAnalyticsKey, eventServerUrl, isProd, gaEnv } from 'sly/web/config';

const cookie = new Cookies();

const getUUID = () => {
  const slyUuid = v4();
  cookie.set('sly_uuid', slyUuid, { domain, path: '/', maxAge: 27000000 });
  return slyUuid;
};

const getSID = () => {
  const sid = randomHexNumber();
  cookie.set('sly_sid', sid, { domain, path: '/', maxAge: 3600 });
  return sid;
};

const getReferrer = () => {
  const { referrer } = document;
  cookie.set('referrer', referrer, { domain, path: '/', maxAge: 27000000 });
  return referrer;
};


export const objectToEventLabel = (obj) => {
  return stringify(obj, ';', ':');
};

const getLocation = () => {
  const { location } = document;
  cookie.set('location', location, { domain, path: '/', maxAge: 27000000 });
  const params = parse(location.search);
  if (params.gclid) {
    cookie.set('adwords', params.gclid, { domain, path: '/', maxAge: 27000000 });
  }
  return location;
};

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
  slyUuid = cookie.get('sly_uuid') || getUUID();
  sid = cookie.get('sly_sid') || getSID();
  referrer = cookie.get('referrer') || getReferrer();
  location = cookie.get('location') || getLocation();
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
      u: this.slyUuid,
      s: this.sid,
      t: Date.now(),
    };

    if (!isProd) {
      console.info('EVENT pageview', uri, `${eventServerUrl}?${stringify(se)}`);
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
      u: this.slyUuid,
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

    if (!isProd) {
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
