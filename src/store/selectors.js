import * as resources from './resource/selectors'
import * as entities from './entities/selectors'

export const getDetail = (state, resource) => entities.getDetail(
  state.entities, 
  resource,
  resources.getDetail(state.resource, resource)
); 

