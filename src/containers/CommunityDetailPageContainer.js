import React, { Component } from 'react';
import { object, string, number, func, bool } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import { getDetail, getHomePageMediaGalleryCurrentSlideIndex, isHomePageMediaGalleryFullscreenActive } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import { gotoSlide, toggleFullscreenMediaGallery } from 'sly/store/communityDetailPage/actions';

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
      mediaGallerySlideIndex, isMediaGalleryFullscreenActive, community, error, history,
    } = this.props;

    if (error) {
      history.push('/notfound');
      return null;
      // return <div>{error}</div>;
    }

    if (!community) {
      return <div>Loading...</div>;
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
  if (err.response.status === 404) {
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
