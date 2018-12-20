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
  recentFamilies: number,
  profileImgUrl: string.isRequired,
});

export default shape({
  url: string.isRequired,
  address,
  aggregateRating,
  agentInfo,
});

