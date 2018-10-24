import React, { Component } from 'react';
import { object, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { USER_SAVE_COMMUNITY_ENTITY_TYPE, USER_SAVE_DELETE_STATUS, USER_SAVE_INIT_STATUS }
  from 'sly/constants/userSave';
import { MODAL_TYPE_JOIN_SLY } from 'sly/constants/modalType';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import {
  SAVE_COMMUNITY_STEPS_CREATE,
  SAVE_COMMUNITY_STEPS_UPDATE,
  SAVE_COMMUNITY_STEPS_COMPLETE,
} from 'sly/constants/saveCommunitySteps';
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
  };

  async componentDidMount() {
    const {
      user, userSave, searchParams, community, setQueryParams, location,
      getCommunityUserSave,
    } = this.props;
    const { id } = community;
    const isActivated = (searchParams.action === ACTIONS_ADD_TO_FAVOURITE ||
      searchParams.action === ACTIONS_REMOVE_FROM_FAVOURITE) && searchParams.entityId === id;

    if (!this.saving && community && isActivated) {
      this.saving = true;
      if (user) {
        await getCommunityUserSave(community.id);
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
    } = this.props;
    const { id } = community;
    const payload = {
      entityType: USER_SAVE_COMMUNITY_ENTITY_TYPE,
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
        set({
          notification: 'createFailed',
        });
        this.handleModalClose();
      });
  }

  updateUserSave = (status) => {
    const {
      userSave, updateUserSave, getUserSaves, set, getCommunityUserSave,
      community,
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
          set({
            notification: 'deleted',
          });
        }
        getCommunityUserSave(community.id);
        // refresh user saves for sidebar
        getUserSaves();
      }, () => {
        this.handleModalClose();
        if (status === USER_SAVE_INIT_STATUS) {
          set({
            notification: 'createFailed',
          });
        } else if (status === USER_SAVE_DELETE_STATUS) {
          set({
            notification: 'deleteFailed',
          });
        }
      });
  }

  handleNotificationClose = () => {
    const { set } = this.props;

    set({
      notification: '',
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
    const { setQueryParams, set } = this.props;

    this.saving = false;
    set({
      currentStep: null,
    });
    setQueryParams({ modal: null, action: null, entityId: null });
  }

  render() {
    const {
      community,
      user,
      notification,
      currentStep,
    } = this.props;
    const { mainImage, similarProperties } = community;

    return (
      <SaveCommunity
        similarCommunities={similarProperties}
        mainImage={mainImage}
        user={user}
        notification={notification}
        onNotificationClose={this.handleNotificationClose}
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
    'filter[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': searchParams.entityId,
  }).find(userSave =>
    userSave.entityType === USER_SAVE_COMMUNITY_ENTITY_TYPE && userSave.entitySlug === searchParams.entityId);

  return {
    user: getDetail(state, 'user', 'me'),
    community,
    userSave,
    location,
    setQueryParams: getQueryParamsSetter(history, location),
    searchParams,
    notification: controller.notification,
    currentStep: controller.currentStep || SAVE_COMMUNITY_STEPS_CREATE,
  };
};

const mapDispatchToProps = dispatch => ({
  createUserSave: data => dispatch(resourceCreateRequest('userSave', data)),
  updateUserSave: (id, data) => dispatch(resourceUpdateRequest('userSave', id, data)),
  getCommunityUserSave: slug => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': slug,
  })),
  getUserSaves: () => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': USER_SAVE_COMMUNITY_ENTITY_TYPE,
    'filter[status]': USER_SAVE_INIT_STATUS,
  })),
});

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(SaveCommunityController));
