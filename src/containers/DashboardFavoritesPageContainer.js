import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { query } from 'sly/services/newApi';
import DashboardFavoritesPage from 'sly/components/pages/DashboardFavoritesPage';

@query('userSaves', 'getUserSaves', getUserSaves => getUserSaves())

export default class DashboardFavoritesPageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
  };

  state = {
    currentGalleryImage: {},
  };

  handleOnGallerySlideChange = (userSaveId, i) => {
    const { currentGalleryImage } = this.state;
    currentGalleryImage[userSaveId] = i;

    this.setState({
      currentGalleryImage,
    });
  };

  render() {
    const { handleOnGallerySlideChange } = this;
    const { userSaves } = this.props;
    const { currentGalleryImage } = this.state;

    return (
      <DashboardFavoritesPage userSaves={userSaves} onGallerySlideChange={handleOnGallerySlideChange} currentGalleryImage={currentGalleryImage} />
    );
  }
}
