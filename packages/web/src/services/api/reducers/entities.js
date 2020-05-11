import * as immutable from 'object-path-immutable';
import { PURGE_FROM_RELATIONSHIPS } from 'sly/services/api/actions';

const initialState = {};

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

function purgeFromRelationships(state, { name, entity }) {
  const relationships = [];
  Object.keys(entity.relationships).forEach((key) => {
    const relationship = entity.relationships[key].data;
    relationships.push(...(Array.isArray(relationship) ? relationship : [relationship]));
  });
  return relationships.reduce((state, relationship) => immutable.set(
    state,
    [relationship.type, relationship.id],
    entityWithout(relationship, name, entity),
  ), state);
}

export default function reducer(state = initialState, action) {
  if (action.type === PURGE_FROM_RELATIONSHIPS) {
    return purgeFromRelationships(state, action.payload.relationship);
  }

  if (!action.meta || !action.meta.api) {
    return state;
  }

  const { type: metaType } = action.meta;

  if (metaType === 'response' && action.payload && action.payload.body) {
    let newState = state;
    const { data, included } = action.payload.body;

    let items;

    if (Array.isArray(data)) {
      items = data;
    } else if (data) {
      items = [data];
    } else {
      items = [];
    }

    if (Array.isArray(included)) {
      items = items.concat(included);
    }

    newState = items.reduce((acc, item) => (
      immutable.set(
        acc,
        [item.type, item.id],
        item,
      )
    ), newState);

    return newState;
  }

  return state;
}

