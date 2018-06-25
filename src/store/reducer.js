import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import entities from './entities/reducer';
import modal from './modal/reducer';
import resource from './resource/reducer';
import experiments from './experiments/reducer';
import header from './header/reducer';
import searchBox from './searchBox/reducer';
import controller from './controller/reducer';
import communityDetailPage from './communityDetailPage/reducer';
import communitySearchPage from './communitySearchPage/reducer';
import chatBox from './chatBox/reducer';

const reducers = {
  form,
  thunk,
  entities,
  modal,
  resource,
  experiments,
  header,
  searchBox,
  controller,
  communityDetailPage,
  communitySearchPage,
  chatBox,
};

export default combineReducers(reducers);

