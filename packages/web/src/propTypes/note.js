import {
  string,
  shape,
} from 'prop-types';

export default shape({
  body: string.isRequired,
  cType: string.isRequired,
  commentableID: string.isRequired,
  commentableType: string.isRequired,
  title: string.isRequired,
  createdAt: string.isRequired,
});
