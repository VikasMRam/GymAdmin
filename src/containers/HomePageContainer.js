import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

import HomePage from 'sly/components/pages/HomePage';
import { setLocation } from 'sly/store/searchBox/actions';
import { getPathFromPlacesResponse } from 'sly/services/helpers/search';

class HomePageContainer extends Component {
  static propTypes = {
    history: object,
    setLocation: func,
  };

  handleOnLocationSearch = (result) => {
    const { history, setLocation } = this.props;
    setLocation(result);
    const path = getPathFromPlacesResponse(result);
    history.push(path);
  };

  render() {
    return <HomePage onLocationSearch={this.handleOnLocationSearch} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: result => dispatch(setLocation(result)),
  };
};

export default connect(null, mapDispatchToProps)(HomePageContainer);
