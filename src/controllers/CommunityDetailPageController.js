import React, { Component } from 'react';
import { func, object, bool, number, string } from 'prop-types';
import { Redirect } from 'react-router';

import { connectController } from 'sly/controllers';
import { withServerState } from 'sly/store';
import SlyEvent from 'sly/services/helpers/events';
import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getSearchParams } from 'sly/services/helpers/search';
import { getDetail, getList } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceListReadRequest }
  from 'sly/store/resource/actions';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import ErrorPage from 'sly/components/pages/Error';

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
    getCommunityUserSave: func,
    isLoadingUserSaves: bool,
    redirectUrl: string,
    setQueryParams: func,
    isShareCommunityModalVisible: bool,
    isAskAgentQuestionModalVisible: bool,
    askAgentQuestionType: string,
  };

  componentDidMount() {
    const {
      getCommunityUserSave, user, community,
    } = this.props;

    if (!this.userSavedLoaded && user && community) {
      this.loadingUserSave = true;
      getCommunityUserSave(community.id).then(() => {
        this.userSavedLoaded = true;
        this.loadingUserSave = false;
      });
    }
  }

  componentDidUpdate() {
    const {
      getCommunityUserSave, user, community,
    } = this.props;

    if (!this.userSavedLoaded && !this.loadingUserSave && user && community) {
      this.loadingUserSave = true;
      getCommunityUserSave(community.id).then(() => {
        this.userSavedLoaded = true;
        this.loadingUserSave = false;
      });
    }
  }

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
    const { setQueryParams, community, userSaveOfCommunity } = this.props;
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
      setQueryParams({ action: ACTIONS_REMOVE_FROM_FAVOURITE, entityId: id });
    } else {
      setQueryParams({ action: ACTIONS_ADD_TO_FAVOURITE, entityId: id });
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

  render() {
    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      isShareCommunityModalVisible,
      user,
      community,
      userSaveOfCommunity,
      errorCode,
      redirectUrl,
      history,
      searchParams,
      setQueryParams,
      userAction,
      isAskAgentQuestionModalVisible,
      askAgentQuestionType,
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

    if (!community || !userAction) {
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
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCommunityUserSave: slug => dispatch(resourceListReadRequest('userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': slug,
  })),
});

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, {
  match, location, history, controller,
}) => {
  // default state for ssr
  const {
    mediaGallerySlideIndex = 0, isMediaGalleryFullscreenActive = false,
    isShareCommunityModalVisible = false, isAskAgentQuestionModalVisible, askAgentQuestionType,
  } = controller;

  const searchParams = getSearchParams(match, location);
  const communitySlug = getCommunitySlug(match);
  const userSaveOfCommunity = getList(state, 'userSave', {
    'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
    'filter[entity_slug]': communitySlug,
  }).find(userSave =>
    userSave.entityType === COMMUNITY_ENTITY_TYPE && userSave.entitySlug === communitySlug);
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
