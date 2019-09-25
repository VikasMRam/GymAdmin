import { number, oneOfType, arrayOf, shape, string } from 'prop-types';

const singleValue = oneOfType([number, string]);

export default shape({
  column: string,
  operator: string,
  value: oneOfType([singleValue, arrayOf(singleValue)]),
});
