import React, { Component } from 'react';
import { object, string, number, func, bool } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import { getDetail, getHomePageMediaGalleryCurrentSlideIndex, isHomePageMediaGalleryFullscreenActive } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import { gotoSlide, toggleFullscreenMediaGallery } from 'sly/store/communityDetailPage/actions';

import ErrorPage from "sly/components/pages/Error";

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    community: object,
    error: string,
    history: object,
    mediaGallerySlideIndex: number,
    isMediaGalleryFullscreenActive: bool,
    gotoMediaGallerySlide: func,
    toggleFullscreenMediaGallery: func,
  };

  handleMediaGallerySlideChange = (slideIndex) => {
    const { gotoMediaGallerySlide } = this.props;
    gotoMediaGallerySlide(slideIndex);
  };

  handleToggleMediaGalleryFullscreen = () => {
    const { toggleFullscreenMediaGallery } = this.props;
    /*
    let event = {action:'show',category:'images',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    let event = {action:'submit',category:'requestavailability',label:this.props.community.id};
    let event = {action:'contactCommunity',category:'requestCallback',label:this.props.community.id};
    SlyEvent.getInstance().sendEvent(event);
    */
    toggleFullscreenMediaGallery();
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const {
      mediaGallerySlideIndex, isMediaGalleryFullscreenActive, community, error, history
    } = this.props;

    if (error) {
      return <ErrorPage errorCode={404} history={history} />;

    }

    if (!community) {
      return <div>Loading...</div>;
    }

    // If request url does not match resource url from api, perform 302 redirect
    const { location } = history;
    const { pathname } = location;
    const { url } = community;
    if (pathname !== url) {
      history.push(url);
    }

    return (
      <CommunityDetailPage
        community={community}
        mediaGallerySlideIndex={mediaGallerySlideIndex}
        onLocationSearch={this.handleOnLocationSearch}
        onMediaGallerySlideChange={this.handleMediaGallerySlideChange}
        onMediaGalleryToggleFullscreen={this.handleToggleMediaGalleryFullscreen}
        isMediaGalleryFullscreenActive={isMediaGalleryFullscreenActive}
      />
    );
  }
}

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  const mediaGallerySlideIndex = getHomePageMediaGalleryCurrentSlideIndex(state);
  const isMediaGalleryFullscreenActive = isHomePageMediaGalleryFullscreenActive(state);
  return {
    community: getDetail(state, 'community', communitySlug),
    mediaGallerySlideIndex,
    isMediaGalleryFullscreenActive,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    gotoMediaGallerySlide: slideIndex => dispatch(gotoSlide(slideIndex)),
    toggleFullscreenMediaGallery: () => dispatch(toggleFullscreenMediaGallery()),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

const handleError = (err) => {
  if (err.response && err.response.status === 404) {
    return { error: 'Unknown Profile!' };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(CommunityDetailPageContainer);
