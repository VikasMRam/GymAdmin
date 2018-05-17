export const SET = 'controller/SET';
export const set = ({ key, value }) => ({
  type: SET,
  payload: { key, value },
});

export const UNSET = 'controller/UNSET';
export const unset = ({ key }) => ({
  type: UNSET,
  payload: { key },
});

