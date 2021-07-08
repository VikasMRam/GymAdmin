import {
  string,
  number,
  shape,
  object,
} from 'prop-types';

import { propInfo, webViewInfo } from 'sly/common/propTypes/community';

export const propRatings = shape({
  numReviews: number,
  reviewsValue: number,
});

export const entity = shape({
  id: string,
  name: string.isRequired,
  url: string.isRequired,
  floorPlanString: string,
  numRevies: number,
  reviewsValue: number,
  addressString: string,
  firstLine: string,
  latitude: number,
  longitude: number,
  maxRate: number,
  resourceType: string,
  secondLine: string,
  startingRate: number,
  tags: object,
  thirdLine: string,
  propInfo,
  webViewInfo,
  propRatings,
  mainImage: string,
});

export default entity;
