import React, { Component } from 'react';
import { func, object, bool, number, string } from 'prop-types';

import { connectController } from 'sly/controllers';
import { withServerState } from 'sly/store';
import SlyEvent from 'sly/services/helpers/events';
import {
  getLastSegment,
  objectToURLQueryParams,
  parseURLQueryParams,
  replaceLastSegment,
} from 'sly/services/helpers/url';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { getSearchParams } from 'sly/services/helpers/search';
import { getDetail, getDetails } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceListReadRequest, resourceUpdateRequest }
  from 'sly/store/resource/actions';
import { forAuthenticated } from 'sly/store/authenticated/actions';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import ErrorPage from 'sly/components/pages/Error';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import { logWarn } from 'sly/services/helpers/logging';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/constants/notifications';

class CommunityDetailPageController extends Component {
  static propTypes = {
    set: func,
    community: object,
    userAction: object,
    userSaveOfCommunity: object,
    errorCode: number,
    history: object,
    location: object,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    user: object,
    isQuestionModalOpenValue: bool,
    searchParams: object,
    isLoadingUserSaves: bool,
    setQueryParams: func,
    isShareCommunityModalVisible: bool,
    isAskAgentQuestionModalVisible: bool,
    askAgentQuestionType: string,
    isHowSlyWorksVideoPlaying: bool,
    updateUserSave: func,
  };

  setModal = (value) => {
    if (value) {
      this.changeSearchParams({ changedParams: { modal: value } });
    } else {
      this.handleParamsRemove({ paramsToRemove: ['modal'] });
    }
  };

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

  handleToggleHowSlyWorksVideoPlaying = () => {
    const { isHowSlyWorksVideoPlaying, set, community } = this.props;
    const { id } = community;
    set({ isHowSlyWorksVideoPlaying: !isHowSlyWorksVideoPlaying });
    const event = {
      action: 'start', category: 'howSlyWorksVideo', label: id,
    };
    if (isHowSlyWorksVideoPlaying) {
      event.action = 'stop';
    }
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

    set({
      isMediaGalleryFullscreenActive: !isMediaGalleryFullscreenActive,
    });
  };

  handleMediaGalleryFavouriteClick = () => {
    const { community, userSaveOfCommunity } = this.props;
    const { id } = community;
    let initedUserSave;
    if (userSaveOfCommunity) {
      initedUserSave = userSaveOfCommunity.status !== USER_SAVE_DELETE_STATUS ? userSaveOfCommunity : null;
    }

    const event = {
      action: 'click', category: 'saveCommunity', label: id,
    };
    if (initedUserSave) {
      event.category = 'unsaveCommunity';
    }
    SlyEvent.getInstance().sendEvent(event);
  };

  handleMediaGalleryShareClick = () => {
    const { set, isShareCommunityModalVisible, community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'shareCommunity', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
    set({
      isShareCommunityModalVisible: !isShareCommunityModalVisible,
    });
  };

  handleShareCommunityModalClose = () => {
    const { set, community } = this.props;
    const { id } = community;
    const event = {
      action: 'close-modal', category: 'shareCommunity', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
    set({
      isShareCommunityModalVisible: false,
    });
  };

  handleFloorPlanModalToggle= (floorPlan) => {
    const { community } = this.props;
    const { id } = community;
    let action = 'close-modal';
    let value = null;
    if (floorPlan) {
      action = 'open-modal';
      value = floorPlan.info.roomType || null;
    }
    const event = {
      action, category: 'floorPlan', label: id, value,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  handleBookATourClick = () => {
    const { community, history } = this.props;
    const { id } = community;
    const event = {
      action: 'click-sat-button', category: 'BAT', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
    history.push(`/book-a-tour/${id}`);
  };

  handleGCPClick = () => {
    const { community, history } = this.props;
    const { id } = community;
    const event = {
      action: 'click-gcp-button', category: 'PricingWizard', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
    history.push(`/custom-pricing/${id}`);
  };

  handleToggleAskAgentQuestionModal = (e, type = null) => {
    const { community, set, isAskAgentQuestionModalVisible } = this.props;
    const { id } = community;
    const action = isAskAgentQuestionModalVisible ? 'close-modal' : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) {
      category += `-${type}`;
    }
    const event = {
      action, category, label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
    set({
      isAskAgentQuestionModalVisible: !isAskAgentQuestionModalVisible,
      askAgentQuestionType: type,
    });
  };

  handleUnsaveCommunity = (notifyInfo, notifyError) => {
    const { updateUserSave, userSaveOfCommunity } = this.props;
    const { id } = userSaveOfCommunity;

    updateUserSave(id, {
      status: USER_SAVE_DELETE_STATUS,
    })
      .then(() => {
        notifyInfo(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS);
      }, () => {
        notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED);
      });
  };

  render() {
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      isShareCommunityModalVisible,
      user,
      community,
      userSaveOfCommunity,
      serverState,
      history,
      searchParams,
      setQueryParams,
      userAction,
      isAskAgentQuestionModalVisible,
      askAgentQuestionType,
      isHowSlyWorksVideoPlaying,
    } = this.props;

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    if (!community || !userAction) {
      logWarn(new Error('Empty community or userAction'));
      return null;
    }

    // If request url does not match resource url from api, perform 302 redirect
    const { location } = history;
    const { pathname } = location;
    const { url, id } = community;
    if (pathname !== url) {
      history.push(url);
    }
    const isAlreadyTourScheduled = userAction && userAction.toursBooked &&
      !!userAction.toursBooked.find(b => b.slug === id);
    const isAlreadyPricingRequested = userAction && userAction.profilesContacted &&
      !!userAction.profilesContacted.find(b => b.slug === id);

    return (
      <CommunityDetailPage
        user={user}
        community={community}
        location={location}
        mediaGallerySlideIndex={mediaGallerySlideIndex}
        onMediaGallerySlideChange={this.handleMediaGallerySlideChange}
        onMediaGalleryToggleFullscreen={this.handleToggleMediaGalleryFullscreen}
        onMediaGalleryFavouriteClick={this.handleMediaGalleryFavouriteClick}
        onMediaGalleryShareClick={this.handleMediaGalleryShareClick}
        onShareCommunityModalClose={this.handleShareCommunityModalClose}
        isMediaGalleryFullscreenActive={isMediaGalleryFullscreenActive}
        isShareCommunityModalVisible={isShareCommunityModalVisible}
        onBackToSearchClicked={this.handleBackToSearchClick}
        onReviewLinkClicked={this.handleReviewLinkClick}
        onConciergeNumberClicked={this.handleConciergeNumberClick}
        onLiveChatClicked={this.handleLiveChatClick}
        onReceptionNumberClicked={this.handleReceptionNumberClick}
        setModal={this.setModal}
        userSave={userSaveOfCommunity}
        searchParams={searchParams}
        setQueryParams={setQueryParams}
        onParamsRemove={this.handleParamsRemove}
        onSubmitSaveCommunityForm={this.handleSubmitSaveCommunityForm}
        onBookATourClick={this.handleBookATourClick}
        onGCPClick={this.handleGCPClick}
        onToggleAskAgentQuestionModal={this.handleToggleAskAgentQuestionModal}
        isAlreadyTourScheduled={isAlreadyTourScheduled}
        isAlreadyPricingRequested={isAlreadyPricingRequested}
        isAskAgentQuestionModalVisible={isAskAgentQuestionModalVisible}
        askAgentQuestionType={askAgentQuestionType}
        onFloorPlanModalToggle={this.handleFloorPlanModalToggle}
        userAction={userAction}
        toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
        isHowSlyWorksVideoPlaying={isHowSlyWorksVideoPlaying}
        onUnsaveCommunity={this.handleUnsaveCommunity}
        history={history}
      />
    );
  }
}

const getCommunitySlug = match => match.params.communitySlug;

const mapPropsToActions = ({ match }) => ({
  community: resourceDetailReadRequest('community', getCommunitySlug(match), {
    include: 'similar-communities,questions,agents',
  }),
  userAction: resourceDetailReadRequest('userAction'),
  userSave: forAuthenticated(resourceListReadRequest('userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': getCommunitySlug(match),
  })),
});

const handleResponses = (responses, { location }, redirect) => {
  const {
    community,
    // userAction,
    userSave,
  } = responses;

  const {
    pathname,
  } = location;

  community(null, (error) => {
    if (error.response) {
      if (error.response.status === 301) {
        redirect(replaceLastSegment(pathname, getLastSegment(error.location)));
        return null;
      }

      if (error.response.status === 404) {
        // Not found so redirect to city page
        redirect(replaceLastSegment(pathname));
        return null;
      }
    }

    return Promise.reject(error);
  });

  userSave(null, (error) => {
    // ignore 401 and 301 errors
    if (error.response && [401, 301].includes(error.response.status)) {
      logWarn(error);
      return null;
    }
    return Promise.reject(error);
  });
};

const ignoreSearchParams = [
  'modal',
  'action',
  'entityId',
  'currentStep',
  'token',
  'modal',
];

const mapStateToProps = (state, {
  match, location, history, controller,
}) => {
  // default state for ssr
  const {
    mediaGallerySlideIndex = 0, isMediaGalleryFullscreenActive = false,
    isShareCommunityModalVisible = false, isAskAgentQuestionModalVisible, askAgentQuestionType,
    isHowSlyWorksVideoPlaying,
  } = controller;
  const searchParams = getSearchParams(match, location);
  const communitySlug = getCommunitySlug(match);
  const userSaves = getDetails(state, 'userSave');
  const userSaveOfCommunity = userSaves.find(us => us.entityType === COMMUNITY_ENTITY_TYPE && us.entitySlug === communitySlug);
  const setQueryParams = getQueryParamsSetter(history, location);

  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
    userAction: getDetail(state, 'userAction') || {},
    userSaveOfCommunity,
    mediaGallerySlideIndex,
    isMediaGalleryFullscreenActive,
    searchParams,
    setQueryParams,
    isShareCommunityModalVisible,
    isAskAgentQuestionModalVisible,
    askAgentQuestionType,
    isHowSlyWorksVideoPlaying,
  };
};

const mapDispatchToProps = dispatch => ({
  updateUserSave: (id, data) => dispatch(ensureAuthenticated(
    'Sign up to add to your favorites list',
    resourceUpdateRequest('userSave', id, data),
  )),
});

export default withServerState(
  mapPropsToActions,
  handleResponses,
  ignoreSearchParams,
)(connectController(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityDetailPageController));
