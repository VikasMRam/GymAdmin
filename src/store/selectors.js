import * as resources from './resource/selectors'
import * as entities from './entities/selectors'

export const getDetail = (state, request) => {
  const resourceDetail = resources.getDetail(state.resource, request);
  return entities.getDetail(
    state.entities,
    resourceDetail,
  );
};

export const getList = (state, request) => {
  const resourceList = resources.getList(state.resource, request);
  return entities.getList(
    state.entities,
    resourceList,
  );
};

