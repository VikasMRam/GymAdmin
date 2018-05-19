export const initialState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: false,
};

export const currentMediaGallerySlideIndex = (state = initialState) => state.mediaGalleryCurrentSlideIndex;

export const isMediaGalleryFullscreenActive = (state = initialState) => state.mediaGalleryFullscreenActive;
