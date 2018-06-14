import { initialState } from './selectors';

export default (state = initialState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};
