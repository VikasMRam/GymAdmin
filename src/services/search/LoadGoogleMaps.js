import React, { Component } from 'react';

import { gMapsApiKey, loadAutoComplete } from 'sly/config';

let instanceId = 0;
export default class LoadGoogleMaps extends Component {
  callbackFunctionName = `google-autocomplete-callback-${instanceId++}`;
  hasLoadedMaps = false;

  loadMaps = () => {
    if (this.hasLoadedMaps) {
      return;
    }
    this.hasLoadedMaps = true;

    const scriptjs = require('scriptjs');
    if (loadAutoComplete) {
      scriptjs(
        `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        () => window[this.callbackFunctionName] && window[this.callbackFunctionName](),
      );
    }
  };

  render() {
    return this.props.children(this.callbackFunctionName, this.loadMaps);
  }
}
