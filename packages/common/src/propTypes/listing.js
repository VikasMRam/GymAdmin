import {
  string,
  number,
  bool,
  shape,
  arrayOf,
} from 'prop-types';

import address from './address';


export const ratingInfo = shape({
  numRatings: number.isRequired,
  ratingValue: number.isRequired,
});

export const section = shape({
  type: string,
  title: string,
  content: string,
});

export const info = shape({
  activities: arrayOf(string),
  agentSlug: string.isRequired,
  description: string,
  floorPlan: shape({
    area: number,
    bathroomCount: number,
    bedRoomCount: number,
  }),
  phoneNumber: string,
  ratingInfo,
  sections: arrayOf(section),
});

export const adminPropInfo = shape({
  info,
  adminNote: string,
  admin: arrayOf(string),
  hasContract: bool,
  lastViewedAt: string,
});

export const adminLisitngPropType = shape({
  id: string,
  address,
  url: string,
  name: string.isRequired,
  propInfo: adminPropInfo,
});

export const listing = shape({
  id: string,
  name: string.isRequired,
  url: string.isRequired,
  info,
  slyScore: number,
  status: number,
});

export const rgsAuxAttributes = shape({
  rgsInfo: shape({
    contract_info: shape({
      hasContract: bool,
    }),
  }),
});

export default listing;
