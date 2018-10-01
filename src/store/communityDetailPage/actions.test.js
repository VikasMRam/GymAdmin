import * as actions from './actions';

test('COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE', () => {
  expect(actions.gotoSlide(3)).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE,
  }));
});

test('COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY', () => {
  expect(actions.toggleFullscreenMediaGallery()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY,
  }));
});

test('COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER', () => {
  expect(actions.toggleStickyHeader()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER,
  }));
});

test('COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN', () => {
  expect(actions.setIsQuestionModalOpenValue()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN,
  }));
});

test('COMMUNITY_DETAIL_ANSWER_QUESTION', () => {
  expect(actions.answerQuestion()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_ANSWER_QUESTION,
  }));
});

test('COMMUNITY_DETAIL_TOGGLE_FAVOURITE_MODAL_OPEN', () => {
  expect(actions.toggleFavouriteModal()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_DETAIL_TOGGLE_FAVOURITE_MODAL_OPEN,
  }));
});
