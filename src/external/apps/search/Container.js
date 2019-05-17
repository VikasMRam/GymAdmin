import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { DEFAULT_LOCATION_CITY, DEFAULT_LOCATION_STATE } from 'sly/external/constants/search';
import { getSearchParamFromPlacesResponse } from 'sly/services/helpers/agents';
import { getSearchParams } from 'sly/services/helpers/search';
import { withProps } from 'sly/services/helpers/hocs';
import SearchComponent from 'sly/external/apps/search/Component';

@withRouter

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))

class Container extends Component {
  static propTypes = {
    searchParams: object,
  };

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
    const { searchParams } = this.props;

    return (
      <SearchComponent
        onLocationSearch={onLocationSearch}
        locationInfo={locationInfo}
        pageNumber={searchParams['page-number']}
      />
    );
  }
}

export default Container;
