import { string, shape } from 'prop-types';

export default shape({
  id: string.isRequired,
  actionPage: string.isRequired,
  actionType: string.isRequired,
  createdAt: string.isRequired,
  updatedAt: string.isRequired,
  uuid: string.isRequired,
});
