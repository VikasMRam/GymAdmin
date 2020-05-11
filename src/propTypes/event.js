import { string, shape } from 'prop-types';

export default shape({
  id: string.isRequired,
  title: string,
  liveAt: string.isRequired,
  createdAt: string.isRequired,
  updatedAt: string.isRequired,
});
