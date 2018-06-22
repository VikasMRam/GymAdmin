export const COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE = 'COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE';
export const COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY = 'COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY';
export const COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER = 'COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER';
export const COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN = 'COMMUNITY_DETAIL_OPEN_MODAL_FOR';
export const COMMUNITY_DETAIL_ANSWER_QUESTION = 'COMMUNITY_DETAIL_ANSWER_QUESTION';

export const gotoSlide = (slideIndex = 0) => ({
  type: COMMUNITY_DETAIL_GOTO_MEDIA_GALLERY_SLIDE,
  payload: {
    slideIndex,
  },
});

export const toggleFullscreenMediaGallery = () => ({
  type: COMMUNITY_DETAIL_TOGGLE_FULLSCREEN_MEDIA_GALLERY,
});

export const toggleStickyHeader = () => ({
  type: COMMUNITY_DETAIL_TOGGLE_STICKY_HEADER,
});

export const setIsQuestionModalOpenValue = value => ({
  type: COMMUNITY_DETAIL_CHANGE_QUESTION_MODAL_OPEN,
  payload: value,
});

export const answerQuestion = question => ({
  type: COMMUNITY_DETAIL_ANSWER_QUESTION,
  payload: question,
});
