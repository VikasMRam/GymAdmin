import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import loadable from '@loadable/component';

import SlyEvent from 'sly/services/helpers/events';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { prefetch } from 'sly/services/newApi';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/constants/notifications';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import withApi from 'sly/services/newApi/withApi';
import withAuth from 'sly/services/newApi/withAuth';
import withNotification from 'sly/controllers/withNotification';
import withModal from 'sly/controllers/withModal';

const ShareCommunityFormContainer = loadable(() => import(/* webpackChunkName: "chunkShareCommunityFormContainer" */'sly/containers/ShareCommunityFormContainer'));
const SaveCommunityContainer = loadable(() => import(/* webpackChunkName: "chunkSaveCommunityContainer" */'sly/containers/SaveCommunityContainer'));

function getCommunityUserSave(community, userSaves) {
  return (
    userSaves &&
    userSaves.find(
      ({ entityType, entitySlug }) =>
        entityType === COMMUNITY_ENTITY_TYPE && entitySlug === community.id
    )
  );
}

function isCommunityAlreadySaved(community, userSaves) {
  const userSaveOfCommunity = getCommunityUserSave(community, userSaves);
  return (
    userSaveOfCommunity &&
    userSaveOfCommunity.status !== USER_SAVE_DELETE_STATUS
  );
}

@withApi
@withAuth
@prefetch('userSaves', 'getUserSaves', (req, { community }) =>
  req({
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': community.id,
  })
)
@withModal
@withNotification
export default class CommunitySummaryContainer extends Component {
  static typeHydrationId = 'CommunitySummaryContainer';
  static propTypes = {
    community: object.isRequired,
    isAdmin: bool,
    userSaves: array,
    ensureAuthenticated: func,
    api: object,
    className: string,
    showModal: func,
    hideModal: func,
    notifyInfo: func,
    notifyError: func,
  };

  sendEvent = (action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: this.props.community.id,
    });

  updateUserSave = (id, data) =>
    this.props.ensureAuthenticated(
      'Sign up to add to your favorites list',
      this.props.api.updateOldUserSave({ id }, data)
    );

  handleFavouriteClick = () => {
    const {
      community,
      showModal,
      hideModal,
      notifyInfo,
      notifyError,
      userSaves,
    } = this.props;

    if (isCommunityAlreadySaved(community, userSaves)) {
      const userSaveToUpdate = getCommunityUserSave(community, userSaves);
      this.updateUserSave(userSaveToUpdate.id, {
        status: USER_SAVE_DELETE_STATUS,
      })
        .then(() => notifyInfo(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS))
        .catch(() =>
          notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED)
        );

      this.sendEvent('click', 'unsaveCommunity');
    } else {
      showModal(
        <SaveCommunityContainer
          slug={community.id}
          onCancelClick={hideModal}
          onDoneButtonClick={hideModal}
          notifyInfo={notifyInfo}
          notifyError={notifyError}
        />,
        null,
        'noPadding',
        false
      );

      this.sendEvent('click', 'saveCommunity');
    }
  };

  handleShareClick = () => {
    const { showModal, hideModal, notifyInfo, community, user } = this.props;

    const onSuccess = () => {
      this.sendEvent('close-modal', 'shareCommunity');
      hideModal();
    };
    const onClose = () => {
      this.sendEvent('close-modal', 'shareCommunity');
    };

    showModal(
      <ShareCommunityFormContainer
        mainImage={community.mainImage}
        fromEnabled={!user || !user.email}
        communitySlug={community.id}
        notifyInfo={notifyInfo}
        onSuccess={onSuccess}
      />,
      onClose
    );

    this.sendEvent('click', 'shareCommunity');
  };

  render() {
    const { community, isAdmin, userSaves, className } = this.props;
    return (
      <CommunitySummary
        community={community}
        isAdmin={isAdmin}
        isFavorited={isCommunityAlreadySaved(community, userSaves)}
        onFavouriteClick={this.handleFavouriteClick}
        onShareClick={this.handleShareClick}
        className={className}
      />
    );
  }
}
