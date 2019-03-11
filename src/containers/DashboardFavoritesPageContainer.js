import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { query } from 'sly/services/newApi';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardFavoritesPage from 'sly/components/pages/DashboardFavoritesPage';

@query('userSaves', 'getUserSaves', getUserSaves => getUserSaves())

export default class DashboardFavoritesPageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
    history: object,
  };

  state = {
    currentGalleryImage: {},
    howSlyWorksVideoPlaying: false,
  };

  handleOnGallerySlideChange = (userSaveId, i) => {
    const { currentGalleryImage } = this.state;
    currentGalleryImage[userSaveId] = i;

    this.setState({
      currentGalleryImage,
    });
  };

  handleToggleHowSlyWorksVideoPlaying = () => {
    const { howSlyWorksVideoPlaying } = this;
    this.setState({ howSlyWorksVideoPlaying: !howSlyWorksVideoPlaying });
    const event = {
      action: 'start', category: 'howSlyWorksVideo', label: 'dashboard-family-favorites',
    };
    if (howSlyWorksVideoPlaying) {
      event.action = 'stop';
    }
    SlyEvent.getInstance().sendEvent(event);
  };

  handleOnLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'dashboardFamilyFavoritesSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const { activeDiscoverHome } = this.state;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, activeDiscoverHome ? activeDiscoverHome.searchParams : {});
    history.push(path);
  };

  render() {
    const { handleOnGallerySlideChange, handleOnLocationSearch, handleToggleHowSlyWorksVideoPlaying } = this;
    const { userSaves } = this.props;
    const { currentGalleryImage, howSlyWorksVideoPlaying } = this.state;

    return (
      <NotificationController>
        {({ notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardFavoritesPage
                notifyInfo={notifyInfo}
                showModal={show}
                hideModal={hide}
                userSaves={userSaves}
                onGallerySlideChange={handleOnGallerySlideChange}
                toggleHowSlyWorksVideoPlaying={handleToggleHowSlyWorksVideoPlaying}
                currentGalleryImage={currentGalleryImage}
                onLocationSearch={handleOnLocationSearch}
                ishowSlyWorksVideoPlaying={howSlyWorksVideoPlaying}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
