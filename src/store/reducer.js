import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import modal from './modal/reducer';
import authenticated from './authenticated/reducer';
import experiments from './experiments/reducer';
import controller from './controller/reducer';
import chatBox from './chatBox/reducer';

import { reducer as api } from 'sly/services/newApi';

export default combineReducers({
  form,
  thunk,
  api,
  modal,
  authenticated,
  experiments,
  controller,
  chatBox,
});

