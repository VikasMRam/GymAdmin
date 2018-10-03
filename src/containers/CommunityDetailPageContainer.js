import React, { Component } from 'react';

import { Redirect } from 'react-router';
import { object, number, func, bool } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';
import { UserSaveCommunityEntityType, UserSaveDeleteStatus, UserSaveInitStatus } from 'sly/services/helpers/user_save';

import {
  getDetail,
  getList,
  getHomePageMediaGalleryCurrentSlideIndex,
  isHomePageMediaGalleryFullscreenActive,
  isCommunityDetailPageStickyHeaderActive,
  isFavouriteModalActive,
  isResourceCreateRequestFailure,
  isResourceListRequestInProgress,
  isResourceListRequestComplete,
} from 'sly/store/selectors';

import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import { resourceDetailReadRequest, resourceListReadRequest, resourceCreateRequest, resourceUpdateRequest }
  from 'sly/store/resource/actions';
import { gotoSlide, toggleFullscreenMediaGallery, toggleStickyHeader, toggleFavouriteModal }
  from 'sly/store/communityDetailPage/actions';

import ErrorPage from 'sly/components/pages/Error';

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    community: object,
    userSaveForCommunity: object,
    errorCode: number,
    history: object,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    gotoMediaGallerySlide: func,
    toggleFullscreenMediaGallery: func,
    isStickyHeaderVisible: bool,
    toggleStickyHeader: func,
    user: object,
    isQuestionModalOpenValue: bool,
    setIsQuestionModalOpenValue: func,
    isFavouriteModalVisible: bool,
    toggleFavouriteModal: func,
    createUserSave: func,
    updateUserSave: func,
    isUserSaveCreateFailure: bool,
    getCommunityUserSave: func,
    isGetCommunityUserSaveComplete: bool,
    isGetCommunityUserSaveInProgress: bool,
  };

  componentDidMount() {
    const { getCommunityUserSave, user, community } = this.props;

    if (user) {
      getCommunityUserSave(community.id);
    }
  }

  componentDidUpdate() {
    const {
      getCommunityUserSave, user, community, isGetCommunityUserSaveInProgress,
      isGetCommunityUserSaveComplete,
    } = this.props;

    if (!isGetCommunityUserSaveComplete && !isGetCommunityUserSaveInProgress && user) {
      getCommunityUserSave(community.id);
    }
  }

  handleMediaGallerySlideChange = (slideIndex, fromMorePictures) => {
    const { gotoMediaGallerySlide, community } = this.props;
    gotoMediaGallerySlide(slideIndex);
    if (fromMorePictures) {
      const { id } = community;
      const { gallery = {}, videoGallery = {} } = community;
      const images = gallery.images || [];
      const videos = videoGallery.videos || [];
      const image = images[slideIndex - videos.length];
      const event = {
        action: 'show', category: 'images', label: id, value: image.id,
      };
      SlyEvent.getInstance().sendEvent(event);
    }
  };

  handleToggleMediaGalleryFullscreen = (fromMorePictures, isVideo, fromSeeMoreButton) => {
    const {
      toggleFullscreenMediaGallery, isMediaGalleryFullscreenActive, community, mediaGallerySlideIndex,
    } = this.props;
    const { id, gallery = {}, videoGallery = {} } = community;
    const images = gallery.images || [];
    const videos = videoGallery.videos || [];
    if (fromSeeMoreButton) {
      const event = {
        action: 'show', category: 'fullscreenMediaGallery', label: id, value: 'seeMoreButton',
      };
      SlyEvent.getInstance().sendEvent(event);
    } else if (!fromMorePictures && !isVideo) {
      const image = images[mediaGallerySlideIndex - videos.length];
      const event = {
        action: 'show', category: 'fullscreenMediaGallery', label: id,
      };
      if (image) {
        event.value = image.id;
      }
      if (isMediaGalleryFullscreenActive) {
        event.action = 'hide';
      }
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[mediaGallerySlideIndex];
      const event = {
        action: 'show', category: 'mediaGalleryVideo', label: id, value: video.id,
      };
      if (isMediaGalleryFullscreenActive) {
        event.action = 'hide';
      }
      SlyEvent.getInstance().sendEvent(event);
    }
    /*
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    let event = {action:'contactCommunity',category:'requestCallback',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    */
    toggleFullscreenMediaGallery();
  };

  handleToggleStickyHeader = () => {
    const { toggleStickyHeader } = this.props;
    toggleStickyHeader();
  };

  handleBackToSearchClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'backToSearch', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleReviewLinkClick = (name) => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'externalReview', label: id, value: name,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleConciergeNumberClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'conciergePhone', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleLiveChatClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'liveChat', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
    olark && olark('api.box.expand');
  };

  handleReceptionNumberClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'receptionPhone', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleMediaGalleryFavouriteClick = () => {
    const {
      toggleFavouriteModal, createUserSave, community, user, userSaveForCommunity, updateUserSave,
    } = this.props;
    if (user) {
      if (!userSaveForCommunity && userSaveForCommunity.status !== UserSaveDeleteStatus) {
        const { id } = community;
        const payload = {
          entityType: UserSaveCommunityEntityType,
          entitySlug: id,
        };

        createUserSave(payload).then(toggleFavouriteModal);
      } else if (userSaveForCommunity.status === UserSaveDeleteStatus) {
        updateUserSave(userSaveForCommunity.id, UserSaveInitStatus).then(toggleFavouriteModal);
      } else {
        updateUserSave(userSaveForCommunity.id, UserSaveDeleteStatus);
      }
    } else {
      toggleFavouriteModal();
    }
  };

  render() {
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      user,
      community,
      userSaveForCommunity,
      errorCode,
      redirectUrl,
      history,
      isStickyHeaderVisible,
      isFavouriteModalVisible,
      isUserSaveCreateFailure,
      isGetCommunityUserSaveComplete,
    } = this.props;

    if (errorCode) {

      if (redirectUrl) { /* Slug has Changed */
        const { location } = history;
        const { pathname } = location;
        //Replace last part of pathname
        let fullPaths = pathname.split('/');
        fullPaths[fullPaths.length - 1] = redirectUrl;
        return <Redirect to={fullPaths.join('/')}/>
      }
      if ( errorCode === 404) { /* Not found so redirect to city page */
        const { location } = history;
        const { pathname } = location;
        //Replace last part of pathname
        let lastIdx = pathname.lastIndexOf('/');
        return <Redirect to={pathname.substring(0,lastIdx)} state={{status:302}}/>
      }

      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    if (!community) {
      return <div />;
    }

    // If request url does not match resource url from api, perform 302 redirect
    const { location } = history;
    const { pathname } = location;
    const { url } = community;
    if (pathname !== url) {
      history.push(url);
    }

    let userSave = userSaveForCommunity;
    if (userSave) {
      userSave = userSave.status !== UserSaveDeleteStatus ? userSave : null;
    }

    return (
      <CommunityDetailPage
        user={user}
        community={community}
        mediaGallerySlideIndex={mediaGallerySlideIndex}
        onMediaGallerySlideChange={this.handleMediaGallerySlideChange}
        onMediaGalleryToggleFullscreen={this.handleToggleMediaGalleryFullscreen}
        onMediaGalleryFavouriteClick={this.handleMediaGalleryFavouriteClick}
        isMediaGalleryFullscreenActive={isMediaGalleryFullscreenActive}
        isStickyHeaderVisible={isStickyHeaderVisible}
        onToggleStickyHeader={this.handleToggleStickyHeader}
        onBackToSearchClicked={this.handleBackToSearchClick}
        onReviewLinkClicked={this.handleReviewLinkClick}
        onConciergeNumberClicked={this.handleConciergeNumberClick}
        onLiveChatClicked={this.handleLiveChatClick}
        onReceptionNumberClicked={this.handleReceptionNumberClick}
        isFavouriteModalVisible={isFavouriteModalVisible}
        isUserSaveCreateFailure={isUserSaveCreateFailure}
        isGetCommunityUserSaveComplete={isGetCommunityUserSaveComplete}
        userSave={userSave}
      />
    );
  }
}

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  const mediaGallerySlideIndex = getHomePageMediaGalleryCurrentSlideIndex(state);
  const isMediaGalleryFullscreenActive = isHomePageMediaGalleryFullscreenActive(state);
  const isStickyHeaderVisible = isCommunityDetailPageStickyHeaderActive(state);
  const isFavouriteModalVisible = isFavouriteModalActive(state);
  const isUserSaveCreateFailure = isResourceCreateRequestFailure(state, 'userSave');
  const isGetCommunityUserSaveComplete = isResourceListRequestComplete(state, 'userSave');
  const isGetCommunityUserSaveInProgress = isResourceListRequestInProgress(state, 'userSave');

  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
    userSaveForCommunity: getList(state, 'userSave')[0],
    mediaGallerySlideIndex,
    isMediaGalleryFullscreenActive,
    isStickyHeaderVisible,
    isFavouriteModalVisible,
    isUserSaveCreateFailure,
    isGetCommunityUserSaveComplete,
    isGetCommunityUserSaveInProgress,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    gotoMediaGallerySlide: slideIndex => dispatch(gotoSlide(slideIndex)),
    toggleFullscreenMediaGallery: () => dispatch(toggleFullscreenMediaGallery()),
    toggleStickyHeader: () => dispatch(toggleStickyHeader()),
    toggleFavouriteModal: () => dispatch(toggleFavouriteModal()),
    createUserSave: data => dispatch(resourceCreateRequest('userSave', data)),
    updateUserSave: (id, status) => dispatch(resourceUpdateRequest('userSave', id, {
      status,
    })),
    getCommunityUserSave: slug => dispatch(resourceListReadRequest('userSave', {
      entityType: UserSaveCommunityEntityType,
      entitySlug: slug,
    })),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities,questions,agents',
    })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

const handleError = (err) => {

  if (err.response) {

    if (err.response.status !== 200) {

      if (err.location) {
        let redUrl = err.location.split('/');
        return { errorCode: err.response.status,
          redirectUrl:redUrl[redUrl.length - 1]
        };

      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(CommunityDetailPageContainer);
