import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';

import configureStore from 'sly/web/store/configure';
import App from 'sly/mobile/components/App';

const store = configureStore();

const MainApp = () => (
  <Provider store={store}>
    <NativeRouter>
      <App />
    </NativeRouter>
  </Provider>
);

export default MainApp;
