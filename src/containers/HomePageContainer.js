import React, { Component } from 'react';
import { object, func } from 'prop-types';

import HomePage from 'sly/components/pages/HomePage';
import { getPathFromPlacesResponse } from 'sly/services/helpers/search';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
  };

  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const path = getPathFromPlacesResponse(result);
    history.push(path);
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <HomePage
        isModalOpen={isModalOpen}
        toggleModal={this.toggleModal}
        onLocationSearch={this.handleOnLocationSearch}
      />
    );
  }
}

export default HomePageContainer;
