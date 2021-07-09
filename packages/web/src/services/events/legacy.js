import { stringify } from 'query-string';

import { eventServerUrl, gaEnv } from 'sly/web/config';

import { getUUID, getSID } from './helpers';

function createEvents () {
  const events = {
    page() {
      const { pathname, search } = window.location;
      const uri = `${pathname}${search}`;

      const se = {
        a: 'view',
        c: pathname,
        p: uri,
        u: getUUID(),
        s: getSID(),
        t: Date.now(),
      };

      fetch(`${eventServerUrl}?${stringify(se)}`);
    },

    track({ action, category, label, value }) {
      const { pathname } = window.location;
      const se = {
        a: action,
        c: category,
        l: label,
        v: value,
        p: pathname,
        u: getUUID(),
        s: getSID(),
        t: Date.now(),
      };

      fetch(`${eventServerUrl}?${stringify(se)}`);
    }
  };

  return events;
}

export default createEvents();

