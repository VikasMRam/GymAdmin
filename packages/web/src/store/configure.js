import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as sagaThunkMiddleware } from 'redux-saga-thunk';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';
import sagas from './sagas';

import { isDev, isBrowser, muteReduxLogger } from 'sly/web/config';

const devtools =
  isDev && isBrowser && window.devToolsExtension
    ? window.devToolsExtension
    : () => fn => fn;


const optionalMiddleware = [];
if (!muteReduxLogger && isBrowser) {
  optionalMiddleware.push(require('redux-logger').createLogger());
}

export default function configure (initialState, services = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    //middleware,
    thunkMiddleware, sagaThunkMiddleware, sagaMiddleware, ...optionalMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(reducer, initialState, compose(...enhancers));
  let sagaTask = sagaMiddleware.run(sagas, services);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services);
      });
    });
  }

  return store;
}
