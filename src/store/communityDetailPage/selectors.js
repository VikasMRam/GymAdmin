export const initialState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: false,
  stickyHeaderVisible: false,
};

export const currentMediaGallerySlideIndex = (state = initialState) => state.mediaGalleryCurrentSlideIndex;

export const isMediaGalleryFullscreenActive = (state = initialState) => state.mediaGalleryFullscreenActive;

export const isStickyHeaderVisible = (state = initialState) => state.stickyHeaderVisible;
