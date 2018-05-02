import * as resources from './resource/selectors'
import * as entities from './entities/selectors'

export const getDetail = (state, resource, id) => entities.getDetail(
  state.entities,
  resource,
  id || resources.getDetail(state.resource, resource),
);

export const getList = (state, resource) => {

  if (resource === 'search') {
    return  entities.getList(state.entities,'community',resources.getList(state.resource, 'search'))
  } else {
    entities.getList(
      state.entities,
      resource,
      resources.getList(state.resource, resource),
    )
  }

  return myList;
};

