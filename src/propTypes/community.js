import {
  string,
  number,
  shape,
} from 'prop-types';

export const propRatings = shape({
  numReviews: number.isRequired,
  reviewsValue: number.isRequired,
});

export const community = shape({
  id: string,
  mainImage: string,
  url: string.isRequired,
  propRatings,
});
