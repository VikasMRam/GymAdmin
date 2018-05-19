import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import entities from './entities/reducer';
import modal from './modal/reducer';
import resource from './resource/reducer';
import concierge from './concierge/reducer';
import header from './header/reducer';
import searchBox from './searchBox/reducer';
import controller from './controller/reducer';
import communityDetailPage from './communityDetailPage/reducer';

const reducers = {
  form,
  thunk,
  entities,
  modal,
  concierge,
  resource,
  header,
  searchBox,
  controller,
  communityDetailPage,
};

export default combineReducers(reducers);

