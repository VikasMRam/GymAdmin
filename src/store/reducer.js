import camelCase from 'lodash/camelCase';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as thunk } from 'redux-saga-thunk';

import entities from './entities/reducer';
import modal from './modal/reducer';
import resource from './resource/reducer';
import concierge from './concierge/reducer';

const reducers = {
  form,
  thunk,
  entities,
  modal,
  concierge,
  resource,
};

export default combineReducers(reducers);
