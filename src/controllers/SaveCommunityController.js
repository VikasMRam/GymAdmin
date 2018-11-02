import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';

import SlyEvent from 'sly/services/helpers/events';
import { USER_SAVE_DELETE_STATUS, USER_SAVE_INIT_STATUS }
  from 'sly/constants/userSave';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { MODAL_TYPE_JOIN_SLY } from 'sly/constants/modalType';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import {
  SAVE_COMMUNITY_STEPS_CREATE,
  SAVE_COMMUNITY_STEPS_UPDATE,
  SAVE_COMMUNITY_STEPS_COMPLETE,
} from 'sly/constants/saveCommunitySteps';
import {
  NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_SUCCESS,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/constants/notifications';
import { resourceListReadRequest, resourceCreateRequest, resourceUpdateRequest }
  from 'sly/store/resource/actions';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { getSearchParams } from 'sly/services/helpers/search';
import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import { getDetail, getList } from 'sly/store/selectors';

import SaveCommunity from 'sly/components/organisms/SaveCommunity';

class SaveCommunityController extends Component {
  static propTypes = {
    user: object,
    location: object,
    userSave: object,
    getCommunityUserSave: func,
    createUserSave: func,
    updateUserSave: func,
    getUserSaves: func,
    community: communityPropType,
    set: func,
    notification: string,
    setQueryParams: func,
    searchParams: object,
    currentStep: string,
    notifyInfo: func,
    notifyError: func,
  };

  async componentDidMount() {
    const {
      user, userSave, searchParams, community, setQueryParams, location,
    } = this.props;

    if (!this.saving && community) {
      this.saving = true;
      if (user) {
        if (searchParams.action === ACTIONS_ADD_TO_FAVOURITE) {
          if (!userSave) {
            this.createUserSave();
          } else if (userSave.status === USER_SAVE_DELETE_STATUS) {
            this.updateUserSave(USER_SAVE_INIT_STATUS);
          }
        } else if (searchParams.action === ACTIONS_REMOVE_FROM_FAVOURITE) {
          this.updateUserSave(USER_SAVE_DELETE_STATUS);
        }
      } else {
        const redirectTo = location.pathname + location.search;
        setQueryParams({
          modal: MODAL_TYPE_JOIN_SLY, redirectTo, action: null, entityId: null,
        });
      }
    }
  }

  createUserSave = () => {
    const {
      community, set, createUserSave, getCommunityUserSave, getUserSaves,
      notifyError,
    } = this.props;
    const { id } = community;
    const payload = {
      entityType: COMMUNITY_ENTITY_TYPE,
      entitySlug: id,
    };

    createUserSave(payload)
      .then(() => {
        set({
          currentStep: SAVE_COMMUNITY_STEPS_UPDATE,
        });
        getCommunityUserSave(community.id);
        // refresh user saves for sidebar
        getUserSaves();
      }, () => {
        this.handleModalClose();
        notifyError(NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED);
      });
  }

  updateUserSave = (status) => {
    const {
      userSave, updateUserSave, getUserSaves, set, getCommunityUserSave,
      community, notifyError, notifyInfo,
    } = this.props;

    updateUserSave(userSave.id, {
      status,
    })
      .then(() => {
        if (status === USER_SAVE_INIT_STATUS) {
          set({
            currentStep: SAVE_COMMUNITY_STEPS_UPDATE,
          });
        } else if (status === USER_SAVE_DELETE_STATUS) {
          this.handleModalClose();
          notifyInfo(NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_SUCCESS);
        }
        getCommunityUserSave(community.id);
        // refresh user saves for sidebar
        getUserSaves();
      }, () => {
        this.handleModalClose();
        if (status === USER_SAVE_INIT_STATUS) {
          notifyError(NOTIFICATIONS_COMMUNITY_ADD_FAVORITE_FAILED);
        } else if (status === USER_SAVE_DELETE_STATUS) {
          notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS);
        }
      });
  }

  handleSubmitSaveCommunityForm = (data) => {
    const {
      updateUserSave, userSave, set,
    } = this.props;

    if (userSave) {
      updateUserSave(userSave.id, {
        note: data.note,
      }).then(() => {
        this.saving = false;
        set({
          currentStep: SAVE_COMMUNITY_STEPS_COMPLETE,
        });
      });
    }
  }

  handleModalClose = () => {
    const { setQueryParams, set, searchParams } = this.props;

    this.saving = false;
    set({
      currentStep: null,
    });
    setQueryParams({ modal: null, action: null, entityId: null });
    const event = {
      action: 'close-modal', category: 'saveCommunity', label: searchParams.entityId,
    };
    SlyEvent.getInstance().sendEvent(event);
  }

  render() {
    const {
      community,
      user,
      currentStep,
    } = this.props;
    const { mainImage, similarProperties } = community;

    return (
      <SaveCommunity
        similarCommunities={similarProperties}
        mainImage={mainImage}
        user={user}
        onModalClose={this.handleModalClose}
        onSubmitSaveCommunityForm={this.handleSubmitSaveCommunityForm}
        currentStep={currentStep}
      />
    );
  }
}

const mapStateToProps = (state, {
  history, match, location, controller,
}) => {
  const searchParams = getSearchParams(match, location);
  const community = searchParams.entityId ? getDetail(state, 'community', searchParams.entityId) : null;
  const userSave = getList(state, 'userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': searchParams.entityId,
  }).find(userSave =>
    userSave.entityType === COMMUNITY_ENTITY_TYPE && userSave.entitySlug === searchParams.entityId);

  return {
    user: getDetail(state, 'user', 'me'),
    community,
    userSave,
    location,
    setQueryParams: getQueryParamsSetter(history, location),
    searchParams,
    currentStep: controller.currentStep || SAVE_COMMUNITY_STEPS_CREATE,
  };
};

const mapDispatchToProps = dispatch => ({
  createUserSave: data => dispatch(resourceCreateRequest('userSave', data)),
  updateUserSave: (id, data) => dispatch(resourceUpdateRequest('userSave', id, data)),
  getCommunityUserSave: slug => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': slug,
  })),
  getUserSaves: () => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[status]': USER_SAVE_INIT_STATUS,
  })),
});

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(SaveCommunityController));
