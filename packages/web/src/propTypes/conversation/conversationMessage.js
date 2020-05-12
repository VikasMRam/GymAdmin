import { string, shape, arrayOf, oneOf } from 'prop-types';

import {
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK,
} from 'sly/constants/conversations';

const valueButtonList = shape({
  selectedButtons: arrayOf(string),
  buttons: arrayOf(shape({
    text: string,
    action: shape({
      type: oneOf([
        CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
        CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK,
      ]),
      value: string,
    }),
  })),
});

export default shape({
  id: string.isRequired,
  conversationID: string.isRequired,
  conversationParticipantID: string.isRequired,
  data: shape({
    type: string.isRequired,
    valueText: string,
    valueButtonList,
  }).isRequired,
  createdAt: string.isRequired,
});
