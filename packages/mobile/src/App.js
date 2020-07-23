import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import configureStore from 'sly/web/store/configure';
import theme from 'sly/common/components/themes/default';
import LoginScreen from 'sly/mobile/screens/LoginScreen';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LoginScreen />
    </ThemeProvider>
  </Provider>
);

export default App;
