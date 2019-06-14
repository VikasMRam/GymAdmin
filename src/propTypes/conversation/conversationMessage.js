import { string, shape } from 'prop-types';

export default shape({
  id: string.isRequired,
  conversationID: string.isRequired,
  conversationParticipantID: string.isRequired,
  data: shape({
    type: string.isRequired,
    value: string.isRequired,
  }).isRequired,
  createdAt: string.isRequired,
});
