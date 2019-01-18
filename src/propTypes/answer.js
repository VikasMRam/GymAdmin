import {
  string,
  shape,
} from 'prop-types';

export const answer = shape({
  creator: string.isRequired,
  createdAt: string.isRequired,
  contentData: string.isRequired,
});
