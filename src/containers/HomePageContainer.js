import React, { Component } from 'react';
import { object, func } from 'prop-types';

import HomePage from 'sly/components/pages/HomePage';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
  };

  state = {
    activeDiscoverHome: null,
  };

  setActiveDiscoverHome = (activeDiscoverHome) => {
    this.setState({ activeDiscoverHome });
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const { activeDiscoverHome } = this.state;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, activeDiscoverHome.searchParams);
    history.push(path);
  };

  render() {
    const { activeDiscoverHome } = this.state;
    return (
      <HomePage
        isModalOpen={activeDiscoverHome !== null}
        setActiveDiscoverHome={this.setActiveDiscoverHome}
        onLocationSearch={this.handleOnLocationSearch}
      />
    );
  }
}

export default HomePageContainer;
