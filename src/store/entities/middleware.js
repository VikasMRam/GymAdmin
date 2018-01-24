// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import normalize from 'json-api-normalizer'
import { env } from 'config'
import { stringfyParams } from '../../services/api/index'
import { entitiesReceive } from './actions'

const middleware = store => next => (action) => {
  const { payload, meta } = action

  if (meta && meta.entities) {
    // endpoint to save payload, presently it saves it in state.entities.meta
    const endpoint = meta.entities + ((meta.request && meta.request.params) ? stringfyParams(meta.request.params) : '')
    // pass endpoint to save api payload in endpoint
    const entities = normalize(payload, { endpoint, filterEndpoint: false })
    store.dispatch(entitiesReceive(entities))
    const result = Object.values(entities[meta.entities]).map(e => e.id)
    return next({ ...action, payload: result })
  }
  return next(action)
};

export default middleware
