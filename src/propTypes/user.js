import { string, number, arrayOf, shape, bool } from 'prop-types';

import address from './address';

const uuidInfo = shape({
  careInfo: shape({
    adls: arrayOf(string),
  }),
  financialInfo: shape({
    maxMonthlyBudget: number,
    medicare: bool,
    payment: string,
  }),
  housingInfo: shape({
    communitySize: arrayOf(string),
    lookingFor: arrayOf(string),
    moveTimeline: string,
    roomPreference: arrayOf(string),
    typeCare: arrayOf(string),
  }),
  locationInfo: shape({
    city: string,
    state: string,
  }),
  residentInfo: shape({
    age: number,
    fullName: string,
    gender: string,
    height: string,
    interest: string,
    weight: number,
  }),
});

export const uuidAux = shape({
  id: string.isRequired,
  uuid: string.isRequired,
  uuidInfo,
});

export default shape({
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  address,
  uuidAux,
});

