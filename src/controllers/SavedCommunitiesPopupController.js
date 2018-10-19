import React, { Component } from 'react';
import { func, array, object, bool } from 'prop-types';
import { withRouter } from 'react-router';

import { connectController } from 'sly/controllers';
import { resourceListReadRequest, resourceUpdateRequest } from 'sly/store/resource/actions';
import SavedCommunitiesPopup from 'sly/components/organisms/SavedCommunititesPopup';
import { USER_SAVE_COMMUNITY_ENTITY_TYPE, USER_SAVE_INIT_STATUS, USER_SAVE_DELETE_STATUS }
  from 'sly/constants/userSave';
import { getList } from 'sly/store/selectors';
import { getSearchParams } from 'sly/services/helpers/search';
import { SAVED_COMMUNITIES } from 'sly/constants/modalType';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

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
    isUserSaveDeleteSuccess: bool,
  };

  componentDidMount() {
    const { getUserSaves, searchParams, set } = this.props;
    if (searchParams.modal === SAVED_COMMUNITIES) {
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
      getUserSaves, searchParams, isLoading, isLoadSuccess, set,
    } = this.props;
    if (!isLoadSuccess && !isLoading && searchParams.modal === SAVED_COMMUNITIES) {
      set({
        isLoading: true,
      });
      getUserSaves().then(() => set({
        isLoadSuccess: true,
        isLoading: false,
      }));
    }
  }

  handleUserSaveDeleteSuccessNotificationClose = () => {
    const { set } = this.props;
    set({ isUserSaveDeleteSuccess: false });
  }

  handleFavouriteClicked = (userSave) => {
    const { set, deleteUserSave, getUserSaves } = this.props;

    deleteUserSave(userSave).then(() => {
      getUserSaves();
      set({ isUserSaveDeleteSuccess: true });
    });
  }

  render() {
    const {
      userSaves, searchParams, isLoading, isLoadSuccess, setQueryParams, isUserSaveDeleteSuccess,
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
        onCloseButtonClick={() => setQueryParams({ modal: null })}
        onFavouriteClicked={this.handleFavouriteClicked}
        isOpen={searchParams.modal === SAVED_COMMUNITIES}
        isUserSaveDeleteSuccess={isUserSaveDeleteSuccess}
        onUserSaveDeleteSuccessNotificationClose={this.handleUserSaveDeleteSuccessNotificationClose}
      />
    );
  }
}

const mapStateToProps = (state, {
  history, match, location, controller,
}) => {
  // default state for ssr
  const { isLoading = false, isLoadSuccess = false, isUserSaveDeleteSuccess = false } = controller;

  return {
    setQueryParams: getQueryParamsSetter(history, location),
    searchParams: getSearchParams(match, location),
    userSaves: getList(state, 'userSave', {
      'filter[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE,
      'filter[status]': USER_SAVE_INIT_STATUS,
    }),
    isLoading,
    isLoadSuccess,
    isUserSaveDeleteSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserSaves: () => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE,
    'filter[status]': USER_SAVE_INIT_STATUS,
  })),
  deleteUserSave: userSave => dispatch(resourceUpdateRequest('userSave', userSave.id, {
    status: USER_SAVE_DELETE_STATUS,
  })),
});

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(SavedCommunitiesPopupController));
