import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import { withRouter } from 'react-router';
import CommunityMediaGallery from 'sly/web/components/organisms/CommunityMediaGallery';
import SlyEvent from 'sly/web/services/helpers/events';
import { prefetch, query } from 'sly/web/services/api';
import { assetPath } from 'sly/web/components/themes';
import withAuth from 'sly/web/services/api/withAuth';
import withNotification from 'sly/web/controllers/withNotification';
import withModal from 'sly/web/controllers/withModal';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/web/constants/notifications';
import { USER_SAVE_DELETE_STATUS } from 'sly/web/constants/userSave';
import { COMMUNITY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';


const ShareCommunityFormContainer = loadable(() => import(/* webpackChunkName: "chunkShareCommunityFormContainer" */'sly/web/containers/ShareCommunityFormContainer'));
const SaveCommunityContainer = loadable(() => import(/* webpackChunkName: "chunkSaveCommunityContainer" */'sly/web/containers/SaveCommunityContainer'));

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


// TODO: move this to common helper, used in multiple places
const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

function getImages({ gallery = {}, mainImage, propInfo = {} }) {
  const defaultImageUrl = communityDefaultImages[propInfo.communitySize] || communityDefaultImages['up to 20 Beds'];

  let images = (gallery.images || []).map(image => ({
    id: image.id,
    path: image.path,
  }));

  // if images is empty add default image
  if (images.length === 0) {
    images = [{ src: defaultImageUrl }];
  }

  // If there is a mainImage put it in front
  const mainImageIndex = images.findIndex((image) => {
    return image.path && mainImage.indexOf(image.path) !== -1;
  });

  if (mainImageIndex !== -1) {
    const [communityMainImage] = images.splice(mainImageIndex, 1);
    images.unshift(communityMainImage);
  }

  return images;
}

@withRouter
@withAuth
@withNotification
@withModal

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
@query('updateOldUserSave')
export default class CommunityMediaGalleryContainer extends React.Component {
  static typeHydrationId = 'CommunityMediaGalleryContainer';
  static propTypes = {
    community: PropTypes.object.isRequired,
    userSaves: PropTypes.array,
    ensureAuthenticated: PropTypes.func,
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    notifyInfo: PropTypes.func,
    notifyError: PropTypes.func,
  };

  state = {
    currentSlideIndex: 0,
    isFullscreenActive: false,
  };

  handleMediaGallerySlideChange = (slideIndex) => {
    this.setState({ currentSlideIndex: slideIndex });
  };

  handleToggleMediaGalleryFullscreen = (isVideo, fromSeeMoreButton) => {
    const { id: communityId, gallery = {}, videoGallery = {} } = this.props.community;
    const { isFullscreenActive, currentSlideIndex } = this.state;

    const images = gallery.images || [];
    const videos = videoGallery.videos || [];

    if (fromSeeMoreButton) {
      const event = {
        action: 'show',
        category: 'fullscreenMediaGallery',
        label: communityId,
        value: 'seeMoreButton',
      };
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[currentSlideIndex] || {};
      if (video) {
        SlyEvent.getInstance().sendEvent({
          action: isFullscreenActive ? 'hide' : 'show',
          category: 'mediaGalleryVideo',
          label: communityId,
          value: video.id,
        });
      }
    } else {
      const image = images[currentSlideIndex - videos.length] || {};
      SlyEvent.getInstance().sendEvent({
        action: isFullscreenActive ? 'hide' : 'show',
        category: 'fullscreenMediaGallery',
        label: communityId,
        value: image.id,
      });
    }

    this.setState({
      isFullscreenActive: !isFullscreenActive,
    });
  };

  sendEvent = (action, category) =>
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: this.props.community.id,
    });

  authenticatedUpdateUserSave = (id, data) => {
    const { ensureAuthenticated, updateOldUserSave } = this.props;
    return ensureAuthenticated(
      'Sign up to add to your favorites list',
      () => updateOldUserSave({ id }, data),
    );
  };

  handleFavouriteClick = () => {
    const {
      community,
      showModal,
      hideModal,
      notifyInfo,
      notifyError,
      userSaves,
      ensureAuthenticated,
    } = this.props;

    if (isCommunityAlreadySaved(community, userSaves)) {
      const userSaveToUpdate = getCommunityUserSave(community, userSaves);
      this.authenticatedUpdateUserSave(userSaveToUpdate.id, {
        status: USER_SAVE_DELETE_STATUS,
      })
        .then(() => notifyInfo(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS))
        .catch(() =>
          notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED)
        );

      this.sendEvent('click', 'unsaveCommunity');
    } else {
      ensureAuthenticated().then(() =>
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
      ));

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
    const { community, userSaves } = this.props;
    const { videoGallery = { videos: [] } } = community;

    const { isFullscreenActive, currentSlideIndex } = this.state;

    return (
      <CommunityMediaGallery
        communityName={community.name}
        city={community.address.city}
        state={community.address.state}
        currentSlide={currentSlideIndex}
        images={getImages(community)}
        videos={videoGallery.videos || []}
        websiteUrl={community.propInfo.websiteUrl}
        onSlideChange={this.handleMediaGallerySlideChange}
        isFullscreenMode={isFullscreenActive}
        onToggleFullscreenMode={this.handleToggleMediaGalleryFullscreen}
        typeCare={community.propInfo.typeCare}
        isFavorited={isCommunityAlreadySaved(community, userSaves)}
        onFavouriteClick={this.handleFavouriteClick}
        onShareClick={this.handleShareClick}
      />
    );
  }
}
