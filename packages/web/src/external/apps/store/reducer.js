import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import { reducer as api } from 'sly/web/services/api';
import controller from 'sly/web/store/controller/reducer';

const reducers = {
  api,
  form,
  thunk,
  controller,
};

export default combineReducers(reducers);
