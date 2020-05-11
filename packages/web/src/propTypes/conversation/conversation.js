import { string, shape, oneOf } from 'prop-types';

import {
  CONVERSATION_STATUS_LIVE,
  CONVERSATION_STATUS_ARCHIVED,
} from 'sly/constants/conversations';

export default shape({
  id: string.isRequired,
  status: oneOf([
    CONVERSATION_STATUS_LIVE,
    CONVERSATION_STATUS_ARCHIVED,
  ]).isRequired,
  createdAt: string.isRequired,
});
