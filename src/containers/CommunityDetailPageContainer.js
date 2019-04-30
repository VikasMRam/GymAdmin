import React, { Component } from 'react';
import { func, object, bool, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import { parse as parseSearch } from 'query-string';

import { withServerState } from 'sly/store';
import SlyEvent from 'sly/services/helpers/events';
import {
  getLastSegment,
  replaceLastSegment,
} from 'sly/services/helpers/url';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import { USER_SAVE_DELETE_STATUS } from 'sly/constants/userSave';
import { getSearchParams } from 'sly/services/helpers/search';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import ErrorPage from 'sly/components/pages/Error';
import { logWarn } from 'sly/services/helpers/logging';
import {
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED,
  NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS,
} from 'sly/constants/notifications';
import NotificationController from 'sly/controllers/NotificationController';
import ModalController from 'sly/controllers/ModalController';
import { query, prefetch, withAuth, withApi } from 'sly/services/newApi';
import { PROFILE_VIEWED } from 'sly/services/newApi/constants';

const ignoreSearchParams = [
  'modal',
  'action',
  'entityId',
  'currentStep',
  'token',
  'modal',
];

const getCommunitySlug = match => match.params.communitySlug;

const mapPropsToActions = ({ match }) => ({
  community: resourceDetailReadRequest('community', getCommunitySlug(match), {
    include: 'similar-communities,questions,agents',
  }),
  userAction: resourceDetailReadRequest('userAction'),
});

// FIXME: hack because createUser is not JSON:API, should use @query
const mapDispatchToProps = (dispatch, { api, ensureAuthenticated }) => ({
  updateUserSave: (id, data) => ensureAuthenticated(
    'Sign up to add to your favorites list',
    api.updateUserSave({ id }, data),
  ),
});

const handleResponses = (responses, { location }, redirect) => {
  const {
    community,
    // userAction,
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
};

const mapStateToProps = (state, {
  match, location, history, userSaves,
}) => {
  // default state for ssr
  const searchParams = getSearchParams(match, location);
  const communitySlug = getCommunitySlug(match);
  const userSaveOfCommunity = userSaves && userSaves.find(us => us.entityType === COMMUNITY_ENTITY_TYPE && us.entitySlug === communitySlug);
  const setQueryParams = getQueryParamsSetter(history, location);

  return {
    user: getDetail(state, 'user', 'me'),
    community: getDetail(state, 'community', communitySlug),
    userAction: getDetail(state, 'userAction') || {},
    userSaveOfCommunity,
    searchParams,
    setQueryParams,
  };
};

@withApi

@withAuth

@query('createAction', 'createUuidAction')

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: getCommunitySlug(match),
  include: 'similar-communities,questions,agents',
}))

@prefetch('userSaves', 'getUserSaves', (req, { match }) => req({
  'filter[entity_type]': COMMUNITY_ENTITY_TYPE,
  'filter[entity_slug]': getCommunitySlug(match),
}))

@withServerState(
  mapPropsToActions,
  handleResponses,
  ignoreSearchParams,
)

@connect(mapStateToProps, mapDispatchToProps)

export default class CommunityDetailPageContainer extends Component {
  static propTypes = {
    set: func,
    community: object,
    userAction: object,
    userSaveOfCommunity: object,
    errorCode: number,
    history: object,
    location: object,
    user: object,
    isQuestionModalOpenValue: bool,
    searchParams: object,
    isLoadingUserSaves: bool,
    setQueryParams: func,
    updateUserSave: func,
    match: shape({
      url: string.isRequired,
    }),
  };

  state = {
    mediaGallerySlideIndex: 0,
    isMediaGalleryFullscreenActive: false,
    isHowSlyWorksVideoPlaying: false,
  };

  componentDidMount() {
    this.uuidActionPageView();
  }

  componentWillUpdate(nextProps) {
    const { match, location } = this.props;
    if (match.url !== nextProps.match.url) {
      this.uuidActionPageView(nextProps);
    } else {
      const prev = omit(parseSearch(location.search), ignoreSearchParams);
      const next = omit(parseSearch(nextProps.location.search), ignoreSearchParams);
      if (!isEqual(prev, next)) {
        this.uuidActionPageView(nextProps);
      }
    }
  }

  uuidActionPageView(props = this.props) {
    const { match, createAction } = props;

    createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo: {
          slug: match.params.communitySlug,
        },
        actionPage: match.url,
        actionType: PROFILE_VIEWED,
      },
    });
  }

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
    const { community } = this.props;
    const { isHowSlyWorksVideoPlaying } = this.state;
    const { id } = community;

    this.setState({ isHowSlyWorksVideoPlaying: !isHowSlyWorksVideoPlaying });

    const event = {
      action: 'start', category: 'howSlyWorksVideo', label: id,
    };
    if (isHowSlyWorksVideoPlaying) {
      event.action = 'stop';
    }
    SlyEvent.getInstance().sendEvent(event);
  };

  handleMediaGallerySlideChange = (slideIndex, fromMorePictures) => {
    const { community } = this.props;
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
    this.setState({
      mediaGallerySlideIndex: slideIndex,
    });
  };

  handleToggleMediaGalleryFullscreen = (fromMorePictures, isVideo, fromSeeMoreButton) => {
    const { community } = this.props;
    const { isMediaGalleryFullscreenActive, mediaGallerySlideIndex } = this.state;

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

    this.setState({
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
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'click', category: 'shareCommunity', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  handleShareCommunityModalClose = () => {
    const { community } = this.props;
    const { id } = community;
    const event = {
      action: 'close-modal', category: 'shareCommunity', label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  handleFloorPlanModalToggle = (floorPlan, isModalOpen) => {
    const { community } = this.props;
    const { id } = community;
    const value = (floorPlan && floorPlan.info.roomType) || null;
    let action = 'open-modal';
    if (isModalOpen) {
      action = 'close-modal';
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

  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible, type = null) => {
    const { community } = this.props;
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
  };

  handleToggleAskQuestionModal = (isAskQuestionModalVisible) => {
    const { community } = this.props;
    const { id } = community;
    const action = isAskQuestionModalVisible ? 'close-modal' : 'open-modal';
    const category = 'AskQuestion';
    const event = {
      action, category, label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  handleUnsaveCommunity = (notifyInfo, notifyError) => {
    const { updateUserSave, userSaveOfCommunity } = this.props;
    const { id } = userSaveOfCommunity;

    return updateUserSave(id, {
      status: USER_SAVE_DELETE_STATUS,
    })
      .then(() => {
        notifyInfo(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_SUCCESS);
      }, () => {
        notifyError(NOTIFICATIONS_COMMUNITY_REMOVE_FAVORITE_FAILED);
      });
  };

  handleToggleAskQuestionModal = (isAskQuestionModalVisible) => {
    const { community } = this.props;
    const { id } = community;
    const action = isAskQuestionModalVisible ? 'close-modal' : 'open-modal';
    const category = 'AskQuestion';
    const event = {
      action, category, label: id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    const {
      user,
      community,
      userSaveOfCommunity,
      serverState,
      history,
      searchParams,
      setQueryParams,
      userAction,
    } = this.props;

    const {
      mediaGallerySlideIndex,
      isMediaGalleryFullscreenActive,
      isHowSlyWorksVideoPlaying,
    } = this.state;

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
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
      <NotificationController>
        {({
          notifyInfo,
          notifyError,
        }) => (
          <ModalController>
            {({
              show,
              hide,
            }) => (
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
                onBackToSearchClicked={this.handleBackToSearchClick}
                onReviewLinkClicked={this.handleReviewLinkClick}
                onConciergeNumberClicked={this.handleConciergeNumberClick}
                onLiveChatClicked={this.handleLiveChatClick}
                onReceptionNumberClicked={this.handleReceptionNumberClick}
                userSave={userSaveOfCommunity}
                searchParams={searchParams}
                setQueryParams={setQueryParams}
                onSubmitSaveCommunityForm={this.handleSubmitSaveCommunityForm}
                onBookATourClick={this.handleBookATourClick}
                onGCPClick={this.handleGCPClick}
                onToggleAskAgentQuestionModal={this.handleToggleAskAgentQuestionModal}
                onToggleAskQuestionModal={this.handleToggleAskQuestionModal}
                isAlreadyTourScheduled={isAlreadyTourScheduled}
                isAlreadyPricingRequested={isAlreadyPricingRequested}
                onFloorPlanModalToggle={this.handleFloorPlanModalToggle}
                userAction={userAction}
                toggleHowSlyWorksVideoPlaying={this.handleToggleHowSlyWorksVideoPlaying}
                isHowSlyWorksVideoPlaying={isHowSlyWorksVideoPlaying}
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                showModal={show}
                hideModal={hide}
                onUnsaveCommunity={this.handleUnsaveCommunity}
                history={history}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
