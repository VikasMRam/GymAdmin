export const SET = 'controller/SET';
export const set = ({ data, controller }) => ({
  type: SET,
  payload: { data, controller },
});

export const UNSET = 'controller/UNSET';
export const unset = ({ key, controller }) => ({
  type: UNSET,
  payload: { key, controller },
});

