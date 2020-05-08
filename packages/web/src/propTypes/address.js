import { string, shape, number } from 'prop-types';

export default shape({
  line1: string,
  line2: string,
  city: string.isRequired,
  state: string.isRequired,
  zip: string,
  county: string,
  latitude: number,
  longitude: number,
});

