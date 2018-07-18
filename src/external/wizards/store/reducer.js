import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import controller from 'sly/store/controller/reducer';
import searchBox from 'sly/store/searchBox/reducer';

const reducers = {
  form,
  thunk,
  controller,
  searchBox,
};

export default combineReducers(reducers);
