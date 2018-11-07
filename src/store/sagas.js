import { all } from 'redux-saga/effects';

import resourceSagas from './resource/sagas';
import authenticatedSagas from './authenticated/sagas';

export default function* rootSaga() {
  yield all([
    resourceSagas,
    authenticatedSagas,
  ]);
}
