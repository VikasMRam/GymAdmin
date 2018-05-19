import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const nextState = {
  mediaGalleryCurrentSlideIndex: 4,
  mediaGalleryFullscreenActive: false,
};
const fullscreenState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: true,
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
