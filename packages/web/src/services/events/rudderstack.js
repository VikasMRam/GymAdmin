import { isServer, isTest, rudderApiKey, rudderDataPlaneUrl } from 'sly/web/config';

import { getUUID } from './helpers';

function loadAnalytics(){
  var e = window.rudderanalytics = window.rudderanalytics || [];
  e.methods = ["load", "page", "track", "identify", "alias", "group", "ready", "reset", "getAnonymousId", "setAnonymousId"];
  e.factory = function(t) {
    return function() {
      var r = Array.prototype.slice.call(arguments);
      return r.unshift(t), e.push(r), e
    }
  };
  for (var t = 0; t < e.methods.length; t++) {
    var r = e.methods[t];
    e[r] = e.factory(r)
  }
  e.loadJS = function(e, t) {
    var r = document.createElement("script");
    r.type = "text/javascript", r.async = !0, r.src = "https://cdn.rudderlabs.com/v1/rudder-analytics.min.js";
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(r, a)
  };
  e.loadJS();
  e.load(rudderApiKey, rudderDataPlaneUrl);
  // e.page()
}

function getRudder() {
  if (typeof window.rudderanalytics === 'object') {
    return window.rudderanalytics;
  }

  loadAnalytics();

  return window.rudderanalytics;
};

function makeRudder() {
  if (isServer || isTest) {
    return;
  }

  return {
    identify(userId, userData) {
      const rudder = getRudder();
      rudder.identify(userId, userData, {
        anonymousId: getUUID(),
      });
    },
    track(event) {
      const rudder = getRudder();
      rudder.track(`${event.action} ${event.category}`, event);
    },
    page() {
      const rudder = getRudder();
      rudder.page();
    }
  };
}

export default makeRudder();
