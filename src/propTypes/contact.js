import { string, shape, arrayOf } from 'prop-types';

export default shape({
  id: string.isRequired,
  name: string.isRequired,
  email: string,
  mobilePhone: string,
  entities: arrayOf(shape({ label: string })).isRequired,
});
