import { number, oneOfType, shape, string } from 'prop-types';

export default shape({
  column: string,
  operator: string,
  value: oneOfType([number, string]),
});

