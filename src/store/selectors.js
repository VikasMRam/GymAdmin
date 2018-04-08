import * as resources from './resource/selectors'
import * as entities from './resource/selectors'

export const getDetail = (state, resource) => entities.getDetail(
  state, 
  resources.getDetail(state, resource)
); 

