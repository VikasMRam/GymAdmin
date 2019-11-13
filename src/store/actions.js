import isPlainObject from 'lodash/isPlainObject';

import {
  RESOURCE_DETAIL_READ_REQUEST,
  RESOURCE_LIST_READ_REQUEST,
} from './resource/actions';

export * from './modal/actions';
export * from './chatBox/actions';
export * from './entities/actions';
export * from './authenticated/actions';

const validKeys = ['type', 'payload', 'error', 'meta'];
const isValidKey = key => validKeys.includes(key);

const readActions = [
  RESOURCE_DETAIL_READ_REQUEST,
  RESOURCE_LIST_READ_REQUEST,
];

const isReadActionType = type => readActions.includes(type);

export function isFSA(action) {
  return (
    isPlainObject(action) &&
    typeof action.type === 'string' &&
    Object.keys(action).every(isValidKey)
  );
}

export function isResourceReadRequest(action) {
  return (
    isPlainObject(action.meta) &&
    typeof action.meta.resource === 'string' &&
    isReadActionType(action.type)
  );
}

export function isError(action) {
  return isFSA(action) && action.error === true;
}
