import { initialState } from './selectors';
import {
  COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE, COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY,
  COMMUNITY_DETAIL_STICKY_HEADER_VISIBLE,
} from './actions';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE:
      return {
        ...state,
        mediaGalleryCurrentSlideIndex: payload.slideIndex,
      };
    case COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY:
      return {
        ...state,
        mediaGalleryFullscreenActive: !state.mediaGalleryFullscreenActive,
      };
    case COMMUNITY_DETAIL_STICKY_HEADER_VISIBLE:
      return {
        ...state,
        stickyHeaderVisible: !state.stickyHeaderVisible,
      };
    default:
      return state;
  }
};
