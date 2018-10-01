import * as resources from './resource/selectors';
import * as experiments from './experiments/selectors';
import * as entities from './entities/selectors';
import * as header from './header/selectors';
import * as searchBox from './searchBox/selectors';
import * as communityDetailPage from './communityDetailPage/selectors';
import * as communitySearchPage from './communitySearchPage/selectors';
import * as chatBox from './chatBox/selectors';

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

export const isResourceRequestInProgress = (state, resource) =>
  resources.getResourceState(state.resource, resource).inProgress;

export const getExperiment = (state, experimentName) =>
  experiments.getExperimentByName(state.experiments, experimentName);

export const getExperiments = state =>
  experiments.getExperiments(state.experiments);

export const isHeaderDropdownOpen = state =>
  header.isDropdownOpen(state.header);

export const searchBoxAddress = state =>
  searchBox.searchBoxAddress(state.searchBox);

export const searchBoxLocation = state =>
  searchBox.searchBoxLocation(state.searchBox);

export const getHomePageMediaGalleryCurrentSlideIndex = state =>
  communityDetailPage.currentMediaGallerySlideIndex(state.communityDetailPage);

export const isHomePageMediaGalleryFullscreenActive = state =>
  communityDetailPage.isMediaGalleryFullscreenActive(state.communityDetailPage);

export const isCommunityDetailPageStickyHeaderActive = state =>
  communityDetailPage.isStickyHeaderVisible(state.communityDetailPage);

export const isQuestionModalOpenSelector = state =>
  communityDetailPage.isQuestionModalOpen(state.communityDetailPage);

export const answerQuestionValueSelector = state =>
  communityDetailPage.answerQuestionValue(state.communityDetailPage);

export const isFavouriteModalActive = state =>
  communityDetailPage.isFavouriteModalActive(state.communityDetailPage);

export const isCommunitySearchPageModalFilterPanelActive = state =>
  communitySearchPage.isModalFilterPanelVisible(state.communitySearchPage);

export const hasChatBoxFooterReached = state =>
  chatBox.hasFooterReached(state.chatBox);
