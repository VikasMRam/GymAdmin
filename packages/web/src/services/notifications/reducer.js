import { ADD, REMOVE } from './actions';

const initialState = { messages: [] };

const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD: {
      const { messages } = state;
      return {
        messages: [payload, ...messages],
      };
    }
    case REMOVE: {
      const { messages } = state;
      const { id } = payload;
      const index = messages.findIndex(m => m.id === id);
      return {
        messages: [...messages.slice(0, index), ...messages.slice(index + 1)],
      };
    }
    default: return state;
  }
};

export default notificationsReducer;
