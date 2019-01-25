import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';

import SlyEvent from 'sly/services/helpers/events';
import HomePage from 'sly/components/pages/HomePage';
import { getSearchParamFromPlacesResponse, filterLinkPath, getSearchParams } from 'sly/services/helpers/search';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
    pathName: string,
    searchParams: object,
    setQueryParams: func,
  };

  state = {
    activeDiscoverHome: null,
    howSlyWorksVideoPlaying: false,
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

  handleToggleHowSlyWorksVideoPlaying = () => {
    const { howSlyWorksVideoPlaying } = this;
    this.setState({ howSlyWorksVideoPlaying: !howSlyWorksVideoPlaying });
    const event = {
      action: 'start', category: 'howSlyWorksVideo', label: 'home',
    };
    if (howSlyWorksVideoPlaying) {
      event.action = 'stop';
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
    const { setActiveDiscoverHome, handleOnLocationSearch, handleToggleHowSlyWorksVideoPlaying } = this;
    const { activeDiscoverHome, howSlyWorksVideoPlaying } = this.state;
    const { searchParams, setQueryParams, pathName } = this.props;
    const { modal, currentStep } = searchParams;
    return (
      <HomePage
        isModalOpen={activeDiscoverHome !== null}
        setActiveDiscoverHome={setActiveDiscoverHome}
        onLocationSearch={handleOnLocationSearch}
        toggleHowSlyWorksVideoPlaying={handleToggleHowSlyWorksVideoPlaying}
        queryParams={{ modal, currentStep }}
        setQueryParams={setQueryParams}
        pathName={pathName}
        ishowSlyWorksVideoPlaying={howSlyWorksVideoPlaying}
      />
    );
  }
}

const mapStateToProps = (state, {
  match, location, history,
}) => {
  const searchParams = getSearchParams(match, location);
  const setQueryParams = getQueryParamsSetter(history, location);
  const { pathname } = location;
  return {
    searchParams,
    setQueryParams,
    pathName: pathname,
  };
};

export default connect(mapStateToProps, null)(HomePageContainer);
