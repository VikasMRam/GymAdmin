import * as resources from './resource/selectors';
import * as entities from './entities/selectors';
import * as header from './header/selectors';

export const getDetail = (state, resource, id) => entities.getDetail(
  state.entities,
  resource,
  id || resources.getDetail(state.resource, resource),
);

export const getList = (state, resource) => entities.getList(
  state.entities,
  resource,
  resources.getList(state.resource, resource),
);

export const isHeaderDropdownOpen = state => header.isDropdownOpen(state.header);
