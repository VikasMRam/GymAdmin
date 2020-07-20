import { string, number, arrayOf, shape, oneOf } from 'prop-types';

import address from './address';

import {
  AGENT_STATUS_DELETED,
  AGENT_STATUS_NOT_LIVE,
  AGENT_STATUS_LIVE,
  AGENT_STATUS_LIVE_ON_PROFILE,
} from 'sly/web/constants/agents';

const aggregateRating = shape({
  ratingValue: number.isRequired,
  numRatings: number.isRequired,
});

const agentInfo = {
  citiesServed: arrayOf(string),
  displayName: string.isRequired,
  slyPhone: string,
  recentFamiliesHelped: number,
  profileImageUrl: string,
  chosenReview: string,
};

const adminInfo = {
  ...agentInfo,
  lastFiveDayLeadCount: number,
  adminNote: string,
  slyScore: number,
  cellPhone: string.isRequired,
  workPhone: string.isRequired,
};

export const adminAgentPropType = shape({
  id: string,
  url: string,
  address,
  aggregateRating,
  status: oneOf([
    AGENT_STATUS_DELETED,
    AGENT_STATUS_NOT_LIVE,
    AGENT_STATUS_LIVE,
    AGENT_STATUS_LIVE_ON_PROFILE,
  ]).isRequired,
  info: shape(adminInfo),
});

export default shape({
  id: string,
  url: string,
  address,
  aggregateRating,
  status: oneOf([
    AGENT_STATUS_DELETED,
    AGENT_STATUS_NOT_LIVE,
    AGENT_STATUS_LIVE,
    AGENT_STATUS_LIVE_ON_PROFILE,
  ]).isRequired,
  info: shape(agentInfo),
});
