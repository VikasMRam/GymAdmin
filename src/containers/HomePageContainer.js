import React, { Component } from 'react';
import { object, func } from 'prop-types';

import HomePage from 'sly/components/pages/HomePage';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import SlyEvent from "sly/services/helpers/events";

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
    const { path } = filterLinkPath(searchParams, activeDiscoverHome ? activeDiscoverHome.searchParams : {});
    history.push(path);
  };

  componentWillMount() {
    SlyEvent.getInstance().sendPageView(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.match !== nextProps.match) {
      SlyEvent.getInstance().sendPageView(this.props.location.pathname);
    }


  }

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
