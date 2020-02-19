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
  websiteUrl: string,
});

export const adminPropInfo = shape({
  propInfo,
  adminNote: string,
  admin: arrayOf(string),
  hasContract: bool,
  lastViewedAt: string,
});


export const adminCommunityPropType = shape({
  id: string,
  address,
  url: string,
  name: string.isRequired,
  propInfo: adminPropInfo,
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

export const rgsAuxAttributes = shape({
  rgsInfo: shape({
    contract_info: shape({
      hasContract: bool,
    }),
  }),
});

export default community;
