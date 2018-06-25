import * as selectors from './selectors';

const initialState = {
  mediaGalleryCurrentSlideIndex: 0,
  mediaGalleryFullscreenActive: false,
  stickyHeaderVisible: false,
  answerQuestion: null,
  isQuestionModalOpen: false,
};

test('initialState', () => {
  expect(selectors.initialState).toEqual(initialState);
});

test('currentMediaGallerySlideIndex', () => {
  expect(selectors.currentMediaGallerySlideIndex(undefined)).toBe(0);
  expect(selectors.currentMediaGallerySlideIndex(selectors.initialState)).toBe(0);
  expect(selectors.currentMediaGallerySlideIndex({ mediaGalleryCurrentSlideIndex: 12 })).toBe(12);
});

test('isMediaGalleryFullscreenActive', () => {
  expect(selectors.isMediaGalleryFullscreenActive(undefined)).toBe(false);
  expect(selectors.isMediaGalleryFullscreenActive(selectors.initialState)).toBe(false);
  expect(selectors.isMediaGalleryFullscreenActive({ mediaGalleryFullscreenActive: false })).toBe(false);
  expect(selectors.isMediaGalleryFullscreenActive({ mediaGalleryFullscreenActive: true })).toBe(true);
});

test('isStickyHeaderVisible', () => {
  expect(selectors.isStickyHeaderVisible(undefined)).toBe(false);
  expect(selectors.isStickyHeaderVisible(selectors.initialState)).toBe(false);
  expect(selectors.isStickyHeaderVisible({ stickyHeaderVisible: false })).toBe(false);
  expect(selectors.isStickyHeaderVisible({ stickyHeaderVisible: true })).toBe(true);
});

test('answerQuestion', () => {
  expect(selectors.answerQuestionValue(undefined)).toBe(null);
  expect(selectors.answerQuestionValue(selectors.initialState)).toBe(null);
  expect(selectors.answerQuestionValue({ answerQuestion: { foo: 'bar' } }).foo).toBe('bar');
});

test('isQuestionModalOpen', () => {
  expect(selectors.isQuestionModalOpen(undefined)).toBe(false);
  expect(selectors.isQuestionModalOpen(selectors.initialState)).toBe(false);
  expect(selectors.isQuestionModalOpen({ isQuestionModalOpen: false })).toBe(false);
  expect(selectors.isQuestionModalOpen({ isQuestionModalOpen: true })).toBe(true);
});