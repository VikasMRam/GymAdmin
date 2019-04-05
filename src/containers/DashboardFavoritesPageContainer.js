import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import produce from 'immer';
import { Redirect } from 'react-router-dom';

import { prefetch } from 'sly/services/newApi';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import DashboardFavoritesPage from 'sly/components/pages/DashboardFavoritesPage';
import userPropType from 'sly/propTypes/user';

@prefetch('userSaves', 'getUserSaves', getUserSaves => getUserSaves({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[status]': USER_SAVE_INIT_STATUS,
}))
@prefetch('user', 'getUser', getUser => getUser({ id: 'me' }))
export default class DashboardFavoritesPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    userSaves: arrayOf(object),
    status: object,
    history: object,
    api: object,
  };

  static defaultProps = {
    userSaves: [],
  }

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

  handleUnfavouriteClick = (id, notifyInfo) => {
    const { api, status } = this.props;
    const { result: rawUserSaves } = status.userSaves;
    const rawUserSave = rawUserSaves.find(us => us.id === id);

    return api.updateUserSave({ id }, {
      data: produce(rawUserSave, (draft) => {
        draft.attributes.status = USER_SAVE_DELETE_STATUS;
      }),
    })
      .then(() => notifyInfo('Community has been removed from favorites'));
  };

  render() {
    const {
      handleOnGallerySlideChange, handleOnLocationSearch, handleToggleHowSlyWorksVideoPlaying, handleUnfavouriteClick,
    } = this;
    const { status } = this.props;
    console.log(status);
    let { userSaves } = this.props;
    if (!userSaves) {
      return 'Loading...';
    }
    console.log(userSaves);
    let { result: rawUserSaves = [] } = status.userSaves;
    const { currentGalleryImage, howSlyWorksVideoPlaying } = this.state;
    // to prevent doing an api call after a user save is unsaved
    userSaves = userSaves.filter(us => us.status === USER_SAVE_INIT_STATUS);
    rawUserSaves = rawUserSaves.filter(us => us.attributes.status === USER_SAVE_INIT_STATUS);

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
                rawUserSaves={rawUserSaves}
                onGallerySlideChange={handleOnGallerySlideChange}
                toggleHowSlyWorksVideoPlaying={handleToggleHowSlyWorksVideoPlaying}
                currentGalleryImage={currentGalleryImage}
                onLocationSearch={handleOnLocationSearch}
                ishowSlyWorksVideoPlaying={howSlyWorksVideoPlaying}
                onUnfavouriteClick={handleUnfavouriteClick}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
