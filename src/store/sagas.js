import { spawn } from 'redux-saga/effects';

import resourceSagas from './resource/sagas';
import authenticatedSagas from './authenticated/sagas';

export default function* rootSaga(services) {
  yield spawn(resourceSagas, services);
  yield spawn(authenticatedSagas, services);
}
