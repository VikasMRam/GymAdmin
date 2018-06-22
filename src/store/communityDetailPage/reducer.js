import { initialState } from './selectors';
import {
  COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE, COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY,
  COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER, COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN,
  COMMUNITY_DETAIL_ANSWER_QUESTION,
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
    case COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER:
      return {
        ...state,
        stickyHeaderVisible: !state.stickyHeaderVisible,
      };
    case COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN:
      return {
        ...state,
        isQuestionModalOpen: payload,
      };
    case COMMUNITY_DETAIL_ANSWER_QUESTION:
      return {
        ...state,
        answerQuestion: payload,
      };
    default:
      return state;
  }
};
