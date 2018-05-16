import React, { Component } from 'react';
import { object } from 'prop-types';

import HomePage from 'sly/components/pages/HomePage';
import { getPathFromPlacesResponse } from 'sly/services/helpers/search';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const path = getPathFromPlacesResponse(result);
    history.push(path);
  };

  render() {
    return <HomePage onLocationSearch={this.handleOnLocationSearch} />;
  }
}

export default HomePageContainer;
