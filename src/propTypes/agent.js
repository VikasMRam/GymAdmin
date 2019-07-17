import { string, number, arrayOf, shape } from 'prop-types';

import address from './address';

const aggregateRating = shape({
  ratingValue: number.isRequired,
  numRatings: number.isRequired,
});

const agentInfo = {
  citiesServed: arrayOf(string).isRequired,
  displayName: string.isRequired,
  slyPhone: string.isRequired,
  recentFamiliesHelped: number,
  profileImageUrl: string.isRequired,
  chosenReview: string,
};

const adminInfo = {
  ...agentInfo,
  lastFiveDayLeadCount: number,
  adminNote: string,
  slyScore: number,
  slyCellPhone: string.isRequired,
  slyWorkPhone: string.isRequired,
};

export const adminAgentPropType = shape({
  id: string,
  url: string,
  address,
  aggregateRating,
  info: shape(adminInfo),
});

export default shape({
  id: string,
  url: string,
  address,
  aggregateRating,
  info: shape(agentInfo),
});

