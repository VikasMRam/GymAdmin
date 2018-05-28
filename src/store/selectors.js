import * as resources from './resource/selectors';
import * as entities from './entities/selectors';
import * as header from './header/selectors';
import * as searchBox from './searchBox/selectors';
import * as communityDetailPage from './communityDetailPage/selectors';

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
