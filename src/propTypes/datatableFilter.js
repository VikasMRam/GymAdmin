import { number, oneOfType, shape, string } from 'prop-types';

export default shape({
  field: string,
  operator: string,
  value: oneOfType([number, string]),
});

