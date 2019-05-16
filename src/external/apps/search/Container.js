import React, { Component } from 'react';

import { DEFAULT_LOCATION_CITY, DEFAULT_LOCATION_STATE } from 'sly/external/constants/search';
import { getSearchParamFromPlacesResponse } from 'sly/services/helpers/agents';
import SearchComponent from 'sly/external/apps/search/Component';

class Container extends Component {
  state = {
    locationInfo: {
      city: DEFAULT_LOCATION_CITY,
      state: DEFAULT_LOCATION_STATE,
    },
  };

  onLocationSearch = (result) => {
    const searchParams = getSearchParamFromPlacesResponse(result);

    this.setState({
      locationInfo: searchParams,
    });
  }

  render() {
    const { onLocationSearch } = this;
    const { locationInfo } = this.state;

    return (
      <SearchComponent
        onLocationSearch={onLocationSearch}
        locationInfo={locationInfo}
      />
    );
  }
}

export default Container;
