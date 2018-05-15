import ReactGA from 'react-ga';

import { eventServerUrl } from 'sly/config';

export const sendPageView =(path)=>{

  ReactGA.pageview(path);
  // fetch(eventServerUrl,{});
};

export const sendEvent = (event) => {
  /*
    category: 'profile',
    action: 'view',
    label: 'slug'
   */

  // ReactGA.event(event);

  /*
     evt = {
        a: 'view',
        c: window.location.pathname,
        l: 'pageView',
        u: this.slyEvent.uuid,
        s: this.slyEvent.sid,
        t: Date.now()
      };
      //
   */

};

//TODO Add more methods for sending timing and non interactive i events.
