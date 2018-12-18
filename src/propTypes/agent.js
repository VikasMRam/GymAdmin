import { string, number, arrayOf, shape } from 'prop-types';

const address = shape({
  city: string.isRequired,
  state: string.isRequired,
});

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
  address,
  aggregateRating,
  agentInfo,
});

