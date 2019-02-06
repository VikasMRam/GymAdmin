import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { Redirect } from 'react-router';
import queryString from 'query-string';

import SlyEvent from 'sly/services/helpers/events';
import PromoPage from 'sly/components/pages/PromoPage';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';

export default class PromoPageContainer extends Component {
  static propTypes = {
    history: object,
    location: object,
    setLocation: func,
  };

  state = {
    activeDiscoverHome: null,
    activeWizard: false,
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

  handleWizardStatus = (activeWizard) => {
    this.setState({ activeWizard });
  };

  render() {
    const { activeDiscoverHome, activeWizard } = this.state;
    const { location } = this.props;
    let utmPresent = false;
    if (location && location.search) {
      const params = queryString.parse(location.search);
      if (params.utm_campaign) {
        utmPresent = true;
      }
    }
    if (!utmPresent) {
      const { pathname } = location;
      return <Redirect to={`${pathname}?utm_campaign=offer150sf&utm_medium=shoppingcart&utm_source=molliestone`} />;
    }
    return (
      <PromoPage
        isModalOpen={activeDiscoverHome !== null}
        isWizardActive={activeWizard}
        setActiveDiscoverHome={this.setActiveDiscoverHome}
        onLocationSearch={this.handleOnLocationSearch}
        wizardStatus={this.handleWizardStatus}
      />
    );
  }
}
