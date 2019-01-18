import {
  string,
  shape,
} from 'prop-types';

export const question = shape({
  creator: string.isRequired,
  createdAt: string.isRequired,
  contentData: string.isRequired,
});
