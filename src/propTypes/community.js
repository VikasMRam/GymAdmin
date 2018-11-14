import {
  string,
  number,
  shape,
} from 'prop-types';

export const webViewInfo = shape({
  firstLineValue: string.isRequired,
  secondLineValue: string.isRequired,
});

export const propRatings = shape({
  numReviews: number.isRequired,
  reviewsValue: number.isRequired,
});

export const community = shape({
  id: string,
  mainImage: string,
  name: string,
  url: string.isRequired,
  webViewInfo,
  propRatings,
});
