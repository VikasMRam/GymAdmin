export const SET = 'controller/SET';
export const set = ({ data, controller }) => dispatch => Promise.resolve().then(() => dispatch({
  type: SET,
  payload: { data, controller },
}));

export const UNSET = 'controller/UNSET';
export const unset = ({ key, controller }) => dispatch => Promise.resolve().then(() => dispatch({
  type: UNSET,
  payload: { key, controller },
}));

export const RESET = 'controller/RESET';
export const reset = ({ controller }) => dispatch => Promise.resolve().then(() => dispatch({
  type: RESET,
  payload: { controller },
}));

