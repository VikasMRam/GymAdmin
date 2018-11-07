import { delay } from 'redux-saga';

export default function* authenticatedSagas() {
  console.log('again');
  yield delay(1000);
}
