import {
  string,
  number,
  shape,
  arrayOf,
} from 'prop-types';

export const webViewInfo = shape({
  firstLineValue: string.isRequired,
  secondLineValue: string.isRequired,
});

export const propRatings = shape({
  numReviews: number.isRequired,
  reviewsValue: number.isRequired,
});

export const propInfo = shape({
  typeCare: arrayOf(string),
});

export const community = shape({
  id: string,
  mainImage: string,
  name: string.isRequired,
  url: string.isRequired,
  floorPlanString: string,
  propInfo,
  webViewInfo,
  propRatings,
});
