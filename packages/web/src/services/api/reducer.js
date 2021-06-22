import * as immutable from 'object-path-immutable';

import { PURGE_FROM_RELATIONSHIPS, INVALIDATE } from './actions';
import { getRequestInfo } from './selectors';

const invalidate = (state, actionName, key) => (
  immutable.set(state, [actionName, key, 'isInvalid'], true)
);

function entityWithout(relationship, relationshipName, entity) {
  const backRelationship = relationship.relationships[relationshipName];
  if (!backRelationship) {
    return relationship;
  }

  const oldData = backRelationship.data;
  let data;
  if (Array.isArray(oldData)) {
    data = oldData.filter(e => e.id !== entity.id);
  } else if (oldData.id === entity.id) {
    data = null;
  }

  return immutable.set(relationship, ['relationships', relationshipName, 'data'], data);
}

function purgeFromRelationships(state, actionName, params, { name, entity }) {
  const relationships = [];
  Object.keys(entity.relationships).forEach((key) => {
    const relationship = entity.relationships[key].data;
    relationships.push(...(Array.isArray(relationship) ? relationship : [relationship]));
  });

  const paramsKey = JSON.stringify(params);
  return relationships.reduce((state, relationship) => immutable.set(
    state,
    [actionName, paramsKey, 'entities', relationship.type, relationship.id],
    entityWithout(relationship, name, entity),
  ), state);
}

export default function reducer(state = {}, action) {
  if (action.type === PURGE_FROM_RELATIONSHIPS) {
    const { actionName, params, relationship } = action.payload;
    return purgeFromRelationships(state, actionName, params, relationship);
  }

  if (action.type === INVALIDATE) {
    const { actionName, params } = action.payload;

    if (!state[actionName]) {
      return state;
    }

    const keys = params
      ? [JSON.stringify(params)]
      : Object.keys(state[actionName]);

    return keys.reduce((acc, key) => {
      return invalidate(acc, actionName, key);
    }, state);
  }

  const { type: metaType, name, params, isJsonApi } = action.meta;

  const paramsKey = JSON.stringify(params);

  if (metaType === 'request') {
    return immutable.set(
      state,
      [name, paramsKey],
      getRequestInfo({ isLoading: true }, isJsonApi),
    );
  } else if (metaType === 'response' && action.payload) {
    const request = {};

    if (action.payload.body) {
      if (isJsonApi) {
        const { data, meta, included } = action.payload.body;

        request.response = data;
        request.meta = meta;

        if (data) {
          const entities = (Array.isArray(data) ? [...data] : [data]);
          if (included) {
            entities.push(...included);
          }

          request.entities = entities.reduce((acc, item) => {
            (acc[item.type] = acc[item.type] || {})[item.id] = item;
            return acc;
          }, {});
        }
      } else {
        request.response = action.payload.body;
      }
    }

    request.header = action.payload.headers;
    request.status = action.payload.status;
    request.isLoading = false;

    return immutable.set(
      state,
      [name, paramsKey],
      getRequestInfo(request, isJsonApi),
    );
  } else if (metaType === 'error') {
    const request = {
      isLoading: false,
      reponse: null,
    };

    if (action.payload instanceof Error) {
      request.error = action.payload.message;
    } else {
      request.error = action.payload.body;
      request.headers = action.payload.headers;
      request.status = action.payload.status;
    }

    return immutable.set(
      state,
      [name, paramsKey],
      getRequestInfo(request, isJsonApi),
    );
  }

  return state;
}

