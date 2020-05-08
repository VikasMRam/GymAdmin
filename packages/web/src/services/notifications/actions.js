
export const ADD = 'NOTIFICATION_ADD';
export const add = message => ({
  type: ADD,
  payload: message,
});

export const REMOVE = 'NOTIFICATION_REMOVE';
export const remove = id => ({
  type: REMOVE,
  payload: { id },
});
