import { string, shape, oneOf } from 'prop-types';

import {
  PERFORMER_STATUS_NOT_LIVE,
  PERFORMER_STATUS_LIVE,
} from 'sly/constants/performers';

export default shape({
  id: string.isRequired,
  name: string,
  description: string,
  galleryID: string,
  status: oneOf([
    PERFORMER_STATUS_NOT_LIVE,
    PERFORMER_STATUS_LIVE,
  ]).isRequired,
  createdAt: string.isRequired,
  updatedAt: string.isRequired,
});
