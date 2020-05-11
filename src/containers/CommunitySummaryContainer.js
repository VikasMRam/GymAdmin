import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

import SlyEvent from 'sly/services/helpers/events';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { prefetch } from 'sly/services/api';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/constants/notifications';
import CommunitySummary from 'sly/components/organisms/CommunitySummary';
import api from 'sly/services/api/apiInstance';
import withAuth from 'sly/services/api/withAuth';
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

@withAuth
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))
@prefetch('userSaves', 'getUserSaves', (req, { match }) =>
  req({
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': match.params.communitySlug,
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
    className: string,
    showModal: func,
    hideModal: func,
    notifyInfo: func,
    notifyError: func,
    history: object,
    match: object,
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
      api.updateOldUserSave.asAction({ id }, data)
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
        'letsmovetothismodaltypealltheothermodals',
        false,
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

  goToReviews = () => {
    this.sendEvent('click', 'viewReviews');
  };

  conciergeNumberClicked = () => {
    this.sendEvent('click', 'conciergeNumberClicked');
  };

  communityNumberClicked = () => {
    this.sendEvent('click', 'communityNumberClicked');
  };

  communityClaimClicked = () => {
    this.sendEvent('click', 'communityClaimClicked');
  };

  render() {
    const { community, isAdmin, userSaves, className, match } = this.props;

    return (
      <CommunitySummary
        community={community}
        isAdmin={isAdmin}
        isFavorited={isCommunityAlreadySaved(community, userSaves)}
        onFavouriteClick={this.handleFavouriteClick}
        onShareClick={this.handleShareClick}
        onConciergeNumberClicked={this.conciergeNumberClicked}
        onCommunityNumberClicked={this.communityNumberClicked}
        onCommunityClaimClicked={this.communityClaimClicked}
        goToReviews={this.goToReviews}
        className={className}
        searchParams={match.params}

      />
    );
  }
}
