// https://github.com/diegohaz/arc/wiki/Redux-modules
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';
import { createLogger } from 'redux-logger';
import { isDev, isBrowser } from 'sly/config';
import entitiesMiddleware from './entities/middleware';
import reducer from './reducer';
import sagas from './sagas';

const devtools =
  isDev && isBrowser && window.devToolsExtension
    ? window.devToolsExtension
    : () => fn => fn;

const loggerMiddleware = createLogger();

const configureStore = (initialState, services = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = [
    applyMiddleware(entitiesMiddleware, thunkMiddleware, sagaMiddleware, loggerMiddleware),
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
};

export default configureStore;
