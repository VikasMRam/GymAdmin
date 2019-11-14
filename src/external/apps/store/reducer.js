import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import { reducer as bees } from 'sly/services/newApi';
import controller from 'sly/store/controller/reducer';

const reducers = {
  bees,
  form,
  thunk,
  controller,
};

export default combineReducers(reducers);
