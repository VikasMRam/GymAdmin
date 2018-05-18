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
