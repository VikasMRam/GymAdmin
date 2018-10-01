export const initialState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: false,
  stickyHeaderVisible: false,
  isQuestionModalOpen: false,
  answerQuestion: null,
  favouriteModalActive: false,
};

export const currentMediaGallerySlideIndex = (state = initialState) => state.mediaGalleryCurrentSlideIndex;

export const isMediaGalleryFullscreenActive = (state = initialState) => state.mediaGalleryFullscreenActive;

export const isStickyHeaderVisible = (state = initialState) => state.stickyHeaderVisible;

export const isQuestionModalOpen = (state = initialState) => state.isQuestionModalOpen;

export const answerQuestionValue = (state = initialState) => state.answerQuestion;

export const isFavouriteModalActive = (state = initialState) => state.favouriteModalActive;
