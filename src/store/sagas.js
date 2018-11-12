import { call } from 'redux-saga/effects';

import resourceSagas from './resource/sagas';
import authenticatedSagas from './authenticated/sagas';

export default function* rootSaga(services) {
  yield call(resourceSagas, services);
  yield call(authenticatedSagas, services);
}
