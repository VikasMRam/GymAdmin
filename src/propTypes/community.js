import {
  object,
  string,
  number,
  array,
  shape,
  oneOf,
  oneOfType,
} from 'prop-types';

export const propRatings = shape({
  numReviews: number.isRequired,
  reviewsValue: number.isRequired,
});

export const community = shape({
  url: string.isRequired,
  propRatings,
});
