import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { connect } from 'react-redux';

import { withRedirectTo } from 'sly/common/services/redirectTo';
import { generateSearchUrl, objectToURLQueryParams } from 'sly/web/services/helpers/url';
import SlyEvent from 'sly/web/services/helpers/events';
import { getSearchParams } from 'sly/web/components/search/helpers';
import { getQueryParamsSetter } from 'sly/web/services/helpers/queryParams';
import ModalController from 'sly/web/controllers/ModalController';
import HomePage from 'sly/web/components/pages/HomePage';

@withRedirectTo

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
    pathName: string,
    searchParams: object,
    setQueryParams: func,
    redirectTo: func.isRequired,
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
    const { redirectTo } = this.props;
    let event;
    if (isFromModal) {
      event = {
        action: 'submit', category: 'discoverHomeSeeMoreSearch', label: result.displayText,
      };
    } else {
      event = {
        action: 'submit', category: 'homeHeroSearch', label: result.displayText,
      };
    }
    SlyEvent.getInstance().sendEvent(event);

    const { activeDiscoverHome } = this.state;

    if (result.action === 'redirect') {
      redirectTo(activeDiscoverHome ?
        `${result.url}&${objectToURLQueryParams(activeDiscoverHome.searchParams)}` : result.url);
    }
  };

  handleCurrentLocation = (addresses, { latitude, longitude }) => {
    const { redirectTo } = this.props;

    if (addresses.length) {
      const path = `${generateSearchUrl(['Nursing Homes'], addresses[0])}`;  //?geo=${latitude},${longitude},10`;

      redirectTo(path);
    }
  };

  render() {
    const { howSlyWorksVideoPlaying } = this.state;
    const { searchParams, setQueryParams, pathName, history } = this.props;
    const { modal, currentStep } = searchParams;
    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <HomePage
            setActiveDiscoverHome={this.setActiveDiscoverHome}
            onLocationSearch={this.handleOnLocationSearch}
            toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
            queryParams={{ modal, currentStep }}
            setQueryParams={setQueryParams}
            pathName={pathName}
            ishowSlyWorksVideoPlaying={howSlyWorksVideoPlaying}
            showModal={show}
            hideModal={hide}
            history={history}
            onCurrentLocation={this.handleCurrentLocation}
          />
        )}
      </ModalController>
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
