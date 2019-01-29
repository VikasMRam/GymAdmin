import React, { Component } from 'react';
import { func, array, object, bool } from 'prop-types';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/services/helpers/events';
import { connectController } from 'sly/controllers';
import { resourceListReadRequest, resourceUpdateRequest } from 'sly/store/resource/actions';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS }
  from 'sly/constants/userSave';
import { getDetails } from 'sly/store/selectors';
import { getSearchParams } from 'sly/services/helpers/search';
import { SAVED_COMMUNITIES } from 'sly/constants/modalType';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

import SavedCommunitiesPopup from 'sly/components/organisms/SavedCommunititesPopup';

class SavedCommunitiesPopupController extends Component {
  static propTypes = {
    userSaves: array,
    getUserSaves: func,
    deleteUserSave: func,
    set: func,
    searchParams: object,
    setQueryParams: func,
    isLoading: bool,
    isLoadSuccess: bool,
    notifyInfo: func,
    location: object,
  };

  componentDidMount() {
    const {
      getUserSaves, searchParams, set, location,
    } = this.props;
    if (searchParams.modal === SAVED_COMMUNITIES) {
      const event = {
        action: 'open', category: 'savedCommunities', label: location.pathname + location.search,
      };
      SlyEvent.getInstance().sendEvent(event);

      set({
        isLoading: true,
      });
      getUserSaves().then(() => set({
        isLoadSuccess: true,
        isLoading: false,
      }));
    }
  }

  componentDidUpdate() {
    const {
      getUserSaves, searchParams, isLoading, isLoadSuccess, set, location,
    } = this.props;

    if (searchParams.modal === SAVED_COMMUNITIES && !isLoading) {
      const event = {
        action: 'open', category: 'savedCommunities', label: location.pathname + location.search,
      };
      SlyEvent.getInstance().sendEvent(event);

      if (!isLoadSuccess) {
        set({
          isLoading: true,
        });
        getUserSaves().then(() => set({
          isLoadSuccess: true,
          isLoading: false,
        }));
      }
    }
  }

  handleFavouriteClicked = (userSave) => {
    const {
      deleteUserSave, getUserSaves, notifyInfo, location,
    } = this.props;

    const event = {
      action: 'favourite-icon-click', category: 'savedCommunities', label: location.pathname + location.search,
    };
    SlyEvent.getInstance().sendEvent(event);
    deleteUserSave(userSave).then(() => {
      getUserSaves();
      notifyInfo('Community Removed.');
    });
  }

  handleCloseButtonClick = () => {
    const { setQueryParams, location } = this.props;
    const event = {
      action: 'close', category: 'savedCommunities', label: location.pathname + location.search,
    };

    setQueryParams({ modal: null });
    SlyEvent.getInstance().sendEvent(event);
  }

  render() {
    const {
      userSaves, searchParams, isLoading, isLoadSuccess,
    } = this.props;

    const savedCommunities = userSaves.reduce((result, userSave) => {
      const { id, info } = userSave;
      const {
        name, address, mainImage, note, url,
      } = info;
      result.push({
        id, name, address, image: mainImage, note, url,
      });
      return result;
    }, []);

    return (
      <SavedCommunitiesPopup
        isLoading={isLoading}
        isLoadSuccess={isLoadSuccess}
        savedCommunities={savedCommunities}
        onCloseButtonClick={this.handleCloseButtonClick}
        onFavouriteClicked={this.handleFavouriteClicked}
        isOpen={searchParams.modal === SAVED_COMMUNITIES}
      />
    );
  }
}

const mapStateToProps = (state, {
  history, match, location, controller,
}) => {
  // default state for ssr
  const { isLoading = false, isLoadSuccess = false } = controller;
  const userSaves = getDetails(state, 'userSave').filter(us => us.entityType === COMMUNITY_ENTITY_TYPE && us.status === USER_SAVE_INIT_STATUS);

  return {
    setQueryParams: getQueryParamsSetter(history, location),
    searchParams: getSearchParams(match, location),
    userSaves,
    isLoading,
    isLoadSuccess,
    location,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserSaves: () => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[status]': USER_SAVE_INIT_STATUS,
  })),
  deleteUserSave: userSave => dispatch(resourceUpdateRequest('userSave', userSave.id, {
    status: USER_SAVE_DELETE_STATUS,
  })),
});

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(SavedCommunitiesPopupController));
