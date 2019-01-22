import {
  string,
  shape,
} from 'prop-types';

export const content = shape({
  creator: string.isRequired,
  createdAt: string.isRequired,
  contentData: string.isRequired,
  type: string.isRequired,
});
