import { stringify } from 'query-string';

import events from 'sly/web/services/events';

export default class SlyEvent {
  static seInstance = null;

  static getInstance() {
    if (this.seInstance === null) {
      this.seInstance = new SlyEvent();
    }
    return this.seInstance;
  }

  sendPageView() {
    events.page();
  }

  sendEvent(event) {
    events.track(event);
  }
}

export const objectToEventLabel = (obj) => {
  return stringify(obj, ';', ':');
};

