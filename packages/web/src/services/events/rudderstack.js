import { isServer, isTest, rudderApiKey } from 'sly/web/config';

import { getUUID } from './helpers';

function loadAnalytics(){
  var rudderanalytics = global.rudderanalytics = [];

  var  methods = [
    "load",
    "page",
    "track",
    "identify",
    "alias",
    "group",
    "ready",
    "reset",
    "getAnonymousId",
    "setAnonymousId"
  ];

  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    rudderanalytics[method] = function (methodName) {
      return function () {
        rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
      };
    }(method);
  }

  rudderanalytics.load(rudderApiKey, 'https://hosted.rudderlabs.com');
  //For example,
  //rudderanalytics.load("1Qb1F3jSWv0eKFBPZcrM7ypgjVo", "http://localhost:8080");
  //rudderanalytics.page();
  // Define a method to load Analytics.js from our CDN,
  // and that will be sure to only ever load it once.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdn.rudderlabs.com/v1/rudder-analytics.min.js';
  // Insert our script next to the first script element.
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);
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

  const rudder = getRudder();

  return {
    identify(userId, userData) {
      rudder.identify(userId, userData, {
        anonymousId: getUUID(),
      });
    },
    track(event) {
      rudder.track(`${event.action} ${event.category}`, event);
    },
    page() {
      rudder.page();
    }
  };
}

export default makeRudder();
