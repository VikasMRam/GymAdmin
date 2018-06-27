import React, { Component } from 'react';
import { object, func } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
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
    const previouslyActiveDiscoverHomeTitle = this.state.activeDiscoverHome ? this.state.activeDiscoverHome.title : null;
    this.setState({ activeDiscoverHome });
    let event;
    if (activeDiscoverHome) {
      event = {
        action: 'click', category: 'discoverHomeSeeMore', label: activeDiscoverHome.title, value: 'modalOpened',
      };
    } else {
      event = {
        action: 'click', category: 'discoverHomeSeeMore', label: previouslyActiveDiscoverHomeTitle, value: 'modalClosed',
      };
    }
    SlyEvent.getInstance().sendEvent(event);
  };

  handleOnLocationSearch = (result, isFromModal) => {
    let event;
    if (isFromModal) {
      event = {
        action: 'submit', category: 'discoverHomeSeeMoreSearch', label: result.formatted_address,
      };
    } else {
      event = {
        action: 'submit', category: 'homeHeroSearch', label: result.formatted_address,
      };
    }
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const { activeDiscoverHome } = this.state;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, activeDiscoverHome ? activeDiscoverHome.searchParams : {});
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
