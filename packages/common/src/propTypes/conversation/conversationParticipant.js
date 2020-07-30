import { string, number, shape, oneOf } from 'prop-types';

import {
  CONVERSATION_PARTICIPANT_TYPE_USER,
  CONVERSATION_PARTICIPANT_TYPE_CLIENT,
  CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION,
  CONVERSATION_STATUS_LIVE,
  CONVERSATION_STATUS_ARCHIVED,
} from 'sly/web/constants/conversations';

export default shape({
  id: string.isRequired,
  conversationID: string.isRequired,
  participantID: string.isRequired,
  participantType: oneOf([
    CONVERSATION_PARTICIPANT_TYPE_USER,
    CONVERSATION_PARTICIPANT_TYPE_CLIENT,
    CONVERSATION_PARTICIPANT_TYPE_ORGANIZATION,
  ]).isRequired,
  stats: shape({
    unreadMessageCount: number.isRequired,
    readMessageCount: number.isRequired,
    lastReadMessageAt: string.isRequired,
  }),
  status: oneOf([
    CONVERSATION_STATUS_LIVE,
    CONVERSATION_STATUS_ARCHIVED,
  ]).isRequired,
  participantInfo: shape({
    name: string.isRequired,
  }),
  createdAt: string.isRequired,
});
