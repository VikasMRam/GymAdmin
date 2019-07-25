import {
  string,
  number,
  bool,
  shape,
  arrayOf,
} from 'prop-types';

import address from './address';

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

export const adminInfo = shape({
  typeCare: arrayOf(string),
  slyUrl: string.isRequired,
  externalUrl: string,
  adminNote: string,
  size: string,
  communityPhone: string,
  pricingString: string,
  hasContract: bool,
  lastViewedAt: string,
});


export const adminCommunityPropType = shape({
  id: string,
  address,
  name: string.isRequired,
  adminInfo,
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
