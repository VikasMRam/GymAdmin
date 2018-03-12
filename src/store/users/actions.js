export const USER_CONVERSION_REQUEST = 'USER_CONVERSION_REQUEST';
export const USER_CONVERSION_SUCCESS = 'USER_CONVERSION_SUCCESS';
export const USER_CONVERSION_FAILURE = 'USER_CONVERSION_FAILURE';

export const userConversionRequest = data => ({
  type: USER_CONVERSION_REQUEST,
  payload: { data },
  meta: {
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    thunk: 'userConversion',
  },
});

export const userConversionSuccess = (detail, request, thunk) => {
  console.log(
    '#######Hey saw this following here',
    detail,
    '###re',
    request,
    '###thunk',
    thunk
  );
  return {
    type: USER_CONVERSION_SUCCESS,
    payload: detail,
    meta: {
      request,
      thunk,
    },
  };
};

export const userConversionFailure = (error, request, thunk) => ({
  type: USER_CONVERSION_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    thunk,
  },
});
