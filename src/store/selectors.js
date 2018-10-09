import * as resources from './resource/selectors';
import * as experiments from './experiments/selectors';
import * as entities from './entities/selectors';
import * as searchBox from './searchBox/selectors';
import * as communitySearchPage from './communitySearchPage/selectors';
import * as chatBox from './chatBox/selectors';

import { getThunkName } from './resource/helpers';

export const getDetail = (state, resource, id) =>
  entities.getDetail(
    state.entities,
    resource,
    id || resources.getDetail(state.resource, resource).id
  );

export const getList = (state, resource) =>
  entities.getList(
    state.entities,
    resource,
    resources.getList(state.resource, resource).ids
  );

export const getDetailMeta = (state, resource) =>
  resources.getDetail(state.resource, resource).meta;

export const getListMeta = (state, resource) =>
  resources.getList(state.resource, resource).meta;

export const isResourceListRequestInProgress = (state, resource) => {
  const thunkName = getThunkName(resource, 'listRead');
  return state.thunk && !!state.thunk.pending[thunkName];
};

export const isResourceListRequestFailure = (state, resource) => {
  const thunkName = getThunkName(resource, 'listRead');
  return state.thunk && !!state.thunk.failure[thunkName];
};

export const isResourceListRequestComplete = (state, resource) => {
  const thunkName = getThunkName(resource, 'listRead');
  return state.thunk && !!state.thunk.complete[thunkName];
};

export const isResourceDetailRequestInProgress = (state, resource) => {
  const thunkName = getThunkName(resource, 'detailRead');
  return state.thunk && !!state.thunk.pending[thunkName];
};

export const isResourceDetailRequestComplete = (state, resource) => {
  const thunkName = getThunkName(resource, 'detailRead');
  return state.thunk && !!state.thunk.complete[thunkName];
};

export const isResourceDetailRequestDone = (state, resource) => {
  const thunkName = getThunkName(resource, 'detailRead');
  return state.thunk && !!state.thunk.done[thunkName];
};

export const isResourceDetailRequestFailure = (state, resource) => {
  const thunkName = getThunkName(resource, 'detailRead');
  return state.thunk && !!state.thunk.failure[thunkName];
};

export const isResourceCreateRequestFailure = (state, resource) => {
  const thunkName = getThunkName(resource, 'create');
  return state.thunk && !!state.thunk.failure[thunkName];
};

export const isResourceUpdateRequestInProgress = (state, resource) => {
  const thunkName = getThunkName(resource, 'update');
  return state.thunk && !!state.thunk.pending[thunkName];
};

export const isResourceUpdateRequestComplete = (state, resource) => {
  const thunkName = getThunkName(resource, 'update');
  return state.thunk && !!state.thunk.complete[thunkName];
};

export const isResourceUpdateRequestDone = (state, resource) => {
  const thunkName = getThunkName(resource, 'update');
  return state.thunk && !!state.thunk.done[thunkName];
};

export const isResourceUpdateRequestFailure = (state, resource) => {
  const thunkName = getThunkName(resource, 'update');
  return state.thunk && !!state.thunk.failure[thunkName];
};

export const getExperiment = (state, experimentName) =>
  experiments.getExperimentByName(state.experiments, experimentName);

export const getExperiments = state =>
  experiments.getExperiments(state.experiments);

export const searchBoxAddress = state =>
  searchBox.searchBoxAddress(state.searchBox);

export const searchBoxLocation = state =>
  searchBox.searchBoxLocation(state.searchBox);

export const isCommunitySearchPageModalFilterPanelActive = state =>
  communitySearchPage.isModalFilterPanelVisible(state.communitySearchPage);

export const hasChatBoxFooterReached = state =>
  chatBox.hasFooterReached(state.chatBox);
