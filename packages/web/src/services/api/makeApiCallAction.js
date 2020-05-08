import { API_CALL } from './constants';

export default function makeApiCallAction(call, params) {
  const { placeholders, path, options, actionName } = params;

  return ({
    type: API_CALL,
    payload: {
      call,
      path,
      placeholders,
      options,
      actionName,
    },
  });
}

