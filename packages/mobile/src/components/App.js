import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from 'sly/common/components/themes/default';
import LoginScreen from 'sly/mobile/components/screens/LoginScreen';

const App = () => (
  <ThemeProvider theme={theme}>
    <LoginScreen />
  </ThemeProvider>
);

export default App;
