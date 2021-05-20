import { string, shape } from 'prop-types';

export default shape({
  id: string,
  fromNumber: string,
  toNumber: string,
  status: string,
});
