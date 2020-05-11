import { spawn } from 'redux-saga/effects';

import authenticatedSagas from './authenticated/sagas';

export default function* rootSaga(services) {
  yield spawn(authenticatedSagas, services);
}
