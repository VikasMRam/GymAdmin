import { API_CALL } from './constants';

export default function makeApiCall(call, args) {
  return ({
    type: API_CALL,
    payload: { call, args },
  });
}

