import React from 'react';
import { Switch, Route } from 'react-router-native';
import { ThemeProvider } from 'styled-components';

import theme from 'sly/common/components/themes/default';
import LoginScreen from 'sly/mobile/components/screens/LoginScreen';

const routes = [
  {
    path: '/',
    component: LoginScreen,
    exact: true,
  },
];

const routeComponents = routes.map(({ component: Component, ...route }) => (
  <Route
    key={route.path}
    {...route}
    component={props => (
      <Component {...props} />
    )}
  />
));

const App = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      {routeComponents}
    </Switch>
  </ThemeProvider>
);

export default App;
