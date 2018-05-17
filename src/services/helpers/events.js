import ReactGA from 'react-ga';
import cookie from 'react-cookie';
import { stringify } from 'query-string';
import { gAnalyticsKey, eventServerUrl } from 'sly/config';

export default class SlyEvent {
  static _seInstance = null;
  address = eventServerUrl;
  uuid = cookie.load('sly_uuid');
  sid = cookie.load('sly_sid');
  ga  = null;

  static getInstance() {
    if ( this._seInstance === null ) {
      this._seInstance = new SlyEvent();
      ReactGA.initialize(gAnalyticsKey);
      this._seInstance.ga = ReactGA.ga();

    }
    return this._seInstance;
  }

  sendPageView( path ) {

    let se = {
      a: 'view',
      c: path,
      p: window.location.pathname,
      u: this.uuid,
      s: this.sid,
      t: Date.now()
    };

    fetch(`${eventServerUrl}?${stringify(se)}`);
    ReactGA.pageview(path);

  }

  sendEvent( event ) {
    let { action, category, label, value } = event;
    let se = {
      a: action,
      c: category,
      l: label,
      v: value,
      p: window.location.pathname,
      u: this.uuid,
      s: this.sid,
      t: Date.now()
    };

    fetch(`${eventServerUrl}?${stringify(se)}`);
    if (category == null) {
      category = window.location.pathname+window.location.hash.split('?')[0];
    }
    ReactGA.event({
      category,
      action,
      label,
      value

    });


  }

}


//TODO Add more methods for sending timing and non interactive i events.
