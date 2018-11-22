import isPlainObject from 'lodash/isPlainObject';

export * from './entities/actions';
export * from './modal/actions';
export * from './searchBox/actions';
export * from './communitySearchPage/actions';
export * from './authenticated/actions';

const validKeys = ['type', 'payload', 'error', 'meta'];
const isValidKey = key => validKeys.includes(key);

export function isFSA(action) {
  return (
    isPlainObject(action) &&
    typeof action.type === 'string' &&
    Object.keys(action).every(isValidKey)
  );
}

export function isError(action) {
  return isFSA(action) && action.error === true;
}
