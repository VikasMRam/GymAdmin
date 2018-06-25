import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const nextState = {
  mediaGalleryCurrentSlideIndex: 4,
  mediaGalleryFullscreenActive: false,
  stickyHeaderVisible: false,
  isQuestionModalOpen: false,
  answerQuestion: null,
};
const fullscreenState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: true,
  stickyHeaderVisible: false,
  isQuestionModalOpen: false,
  answerQuestion: null,
};
const stickyHeaderState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: false,
  stickyHeaderVisible: true,
  isQuestionModalOpen: false,
  answerQuestion: null,
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE', () => {
  const action = {
    type: actions.COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE,
    payload: {
      slideIndex: 4,
    },
  };
  expect(reducer(initialState, action)).toEqual({ ...nextState });
});

it('handles COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY', () => {
  const action = {
    type: actions.COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY,
  };
  expect(reducer(initialState, action)).toEqual({ ...fullscreenState });
});

it('handles COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER', () => {
  const action = {
    type: actions.COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER,
  };
  expect(reducer(initialState, action)).toEqual({ ...stickyHeaderState });
});

it('handles COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN', () => {
  const action = {
    type: actions.COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN,
    payload: true,
  };
  expect(reducer(initialState, action).isQuestionModalOpen).toEqual(true);
});

it('handles COMMUNITY_DETAIL_ANSWER_QUESTION', () => {
  const action = {
    type: actions.COMMUNITY_DETAIL_ANSWER_QUESTION,
    payload: { foo: 'bar' },
  };
  expect(reducer(initialState, action).answerQuestion).toEqual({ foo: 'bar' });
});
