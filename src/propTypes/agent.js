import { string, number, arrayOf, shape } from 'prop-types';

import { address } from './address';

const aggregateRating = shape({
  ratingValue: number.isRequired,
  numRatings: number.isRequired,
});

const agentInfo = shape({
  citiesServed: arrayOf(string).isRequired,
  displayName: string.isRequired,
  slyPhone: string.isRequired,
  recentFamiliesHelped: number,
  profileImageUrl: string.isRequired,
  chosenReview: string,
});

export default shape({
  id: string,
  url: string,
  address,
  aggregateRating,
  info: agentInfo,
});

