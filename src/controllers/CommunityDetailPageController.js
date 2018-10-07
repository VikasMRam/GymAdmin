import React, { Component } from 'react';
import { func, object, bool, number, string } from 'prop-types';
import { Redirect } from 'react-router';

import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';
import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';
import { UserSaveCommunityEntityType, UserSaveDeleteStatus, UserSaveInitStatus } from 'sly/services/helpers/user_save';
import { getSearchParams } from 'sly/services/helpers/search';

import {
  getDetail,
  getList,
  isResourceCreateRequestFailure,
  isResourceListRequestInProgress,
  isResourceListRequestComplete,
  isResourceUpdateRequestComplete,
} from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceListReadRequest, resourceCreateRequest, resourceUpdateRequest }
  from 'sly/store/resource/actions';

import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import ErrorPage from 'sly/components/pages/Error';

class CommunityDetailPageController extends Component {
  static propTypes = {
    set: func,
    community: object,
    userSaveForCommunity: object,
    errorCode: number,
    history: object,
    location: object,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    isStickyHeaderVisible: bool,
    user: object,
    isQuestionModalOpenValue: bool,
    searchParams: object,
    isFavouriteModalVisible: bool,
    createUserSave: func,
    updateUserSave: func,
    isUserSaveCreateFailure: bool,
    getCommunityUserSave: func,
    isGetCommunityUserSaveComplete: bool,
    isGetCommunityUserSaveInProgress: bool,
    isUserSaveUpdateComplete: bool,
    redirectUrl: string,
  };

  componentDidMount() {
    const { getCommunityUserSave, user, community } = this.props;

    if (user && community) {
      getCommunityUserSave(community.id);
    }
  }

  componentDidUpdate() {
    const {
      getCommunityUserSave, user, community, isGetCommunityUserSaveInProgress,
      isGetCommunityUserSaveComplete,
    } = this.props;

    if (!isGetCommunityUserSaveComplete && !isGetCommunityUserSaveInProgress && user && community) {
      getCommunityUserSave(community.id);
    }
  }

  setModal = (value) => {
    if (value) {
      this.changeSearchParams({ changedParams: { modal: value } });
    } else {
      this.handleParamsRemove({ paramsToRemove: ['modal'] });
    }
  }

  setQuestionToAsk = (question) => {
    if (question) {
      this.changeSearchParams({ changedParams: { modal: 'answerQuestion', entityId: question.id } });
    } else {
      this.changeSearchParams({ changedParams: { modal: null, entityId: null } });
    }
  }

  changeSearchParams = ({ changedParams }) => {
    const { history, location } = this.props;
    const { pathname, search } = location;

    const newParams = { ...parseURLQueryParams(search), ...changedParams };
    const path = `${pathname}?${objectToURLQueryParams(newParams)}`;
    history.push(path);
  };

  handleParamsRemove = ({ paramsToRemove }) => {
    const { set } = this.props;
    const changedParams = paramsToRemove.reduce((obj, p) => {
      const nobj = obj;
      nobj[p] = undefined;
      return nobj;
    }, {});
    this.changeSearchParams({ changedParams });
    set({
      userSaveUpdated: false,
    });
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
    window && window.olark && window.olark('api.box.expand');
  };

  handleReceptionNumberClick = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'receptionPhone', label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleMediaGallerySlideChange = (slideIndex, fromMorePictures) => {
    const { set, community } = this.props;
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
    set({
      mediaGallerySlideIndex: slideIndex,
    });
  };

  handleToggleMediaGalleryFullscreen = (fromMorePictures, isVideo, fromSeeMoreButton) => {
    const {
      set, isMediaGalleryFullscreenActive, community, mediaGallerySlideIndex,
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
      if (video) {
        const event = {
          action: 'show', category: 'mediaGalleryVideo', label: id, value: video.id,
        };
        if (isMediaGalleryFullscreenActive) {
          event.action = 'hide';
        }
        SlyEvent.getInstance().sendEvent(event);
      }
    }
    /*
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    let event = {action:'contactCommunity',category:'requestCallback',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    */
    set({
      isMediaGalleryFullscreenActive: !isMediaGalleryFullscreenActive,
    });
  };

  handleToggleStickyHeader = () => {
    const { set, isStickyHeaderVisible } = this.props;
    set({
      isStickyHeaderVisible: !isStickyHeaderVisible,
    });
  };

  handleMediaGalleryFavouriteClick = () => {
    const {
      createUserSave, community, user, userSaveForCommunity, updateUserSave,
      getCommunityUserSave,
    } = this.props;
    if (user) {
      if (!userSaveForCommunity) {
        const { id } = community;
        const payload = {
          entityType: UserSaveCommunityEntityType,
          entitySlug: id,
        };

        createUserSave(payload).then(() => {
          this.setModal('addToFavourite');
          getCommunityUserSave(community.id);
        });
      } else if (userSaveForCommunity.status === UserSaveDeleteStatus) {
        updateUserSave(userSaveForCommunity.id, {
          status: UserSaveInitStatus,
        }).then(() => {
          this.setModal('addToFavourite');
        });
      } else {
        updateUserSave(userSaveForCommunity.id, {
          status: UserSaveDeleteStatus,
        });
      }
    } else {
      this.setModal('addToFavourite');
    }
  };

  handleSubmitSaveCommunityForm = (data) => {
    const { updateUserSave, userSaveForCommunity, set } = this.props;

    if (userSaveForCommunity) {
      updateUserSave(userSaveForCommunity.id, {
        note: data.note,
      }).then(() => {
        set({
          userSaveUpdated: true,
        });
      });
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
      searchParams,
      isUserSaveUpdateComplete,
    } = this.props;

    if (errorCode) {
      if (redirectUrl) { /* Slug has Changed */
        const { location } = history;
        const { pathname } = location;
        // Replace last part of pathname
        const fullPaths = pathname.split('/');
        fullPaths[fullPaths.length - 1] = redirectUrl;
        return <Redirect to={fullPaths.join('/')} />;
      }
      if (errorCode === 404) { /* Not found so redirect to city page */
        const { location } = history;
        const { pathname } = location;
        // Replace last part of pathname
        const lastIdx = pathname.lastIndexOf('/');
        return <Redirect to={pathname.substring(0, lastIdx)} state={{ status: 302 }} />;
      }

      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    if (!community) {
      return null;
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
        setModal={this.setModal}
        setQuestionToAsk={this.setQuestionToAsk}
        isFavouriteModalVisible={isFavouriteModalVisible}
        isUserSaveCreateFailure={isUserSaveCreateFailure}
        isGetCommunityUserSaveComplete={isGetCommunityUserSaveComplete}
        userSave={userSave}
        searchParams={searchParams}
        onParamsRemove={this.handleParamsRemove}
        onSubmitSaveCommunityForm={this.handleSubmitSaveCommunityForm}
        isUserSaveUpdateComplete={isUserSaveUpdateComplete}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUserSave: data => dispatch(resourceCreateRequest('userSave', data)),
    updateUserSave: (id, data) => dispatch(resourceUpdateRequest('userSave', id, data)),
    getCommunityUserSave: slug => dispatch(resourceListReadRequest('userSave', {
      entityType: UserSaveCommunityEntityType,
      entitySlug: slug,
    })),
  };
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match, location, controller }) => {
  // default state for ssr
  const {
    mediaGallerySlideIndex = 0, isMediaGalleryFullscreenActive = false, isStickyHeaderVisible = false,
    userSaveUpdated = false,
  } = controller;

  const searchParams = getSearchParams(match, location);
  const communitySlug = getCommunitySlug(match);
  const isUserSaveCreateFailure = isResourceCreateRequestFailure(state, 'userSave');
  const isGetCommunityUserSaveComplete = isResourceListRequestComplete(state, 'userSave');
  const isUserSaveUpdateComplete = userSaveUpdated && isResourceUpdateRequestComplete(state, 'userSave');
  const isGetCommunityUserSaveInProgress = isResourceListRequestInProgress(state, 'userSave');

  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
    userSaveForCommunity: getList(state, 'userSave')[0],
    mediaGallerySlideIndex,
    isMediaGalleryFullscreenActive,
    isStickyHeaderVisible,
    isUserSaveCreateFailure,
    isGetCommunityUserSaveComplete,
    isGetCommunityUserSaveInProgress,
    isUserSaveUpdateComplete,
    searchParams,
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
        const redUrl = err.location.split('/');
        return {
          errorCode: err.response.status,
          redirectUrl: redUrl[redUrl.length - 1],
        };
      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  fetchData,
  handleError,
})(connectController(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityDetailPageController));
