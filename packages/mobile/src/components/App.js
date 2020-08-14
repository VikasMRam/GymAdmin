import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Switch, Route } from 'react-router-native';
import { ThemeProvider } from 'styled-components';

import theme from 'sly/common/components/themes/default';
import { routes as routesPropType } from 'sly/common/propTypes/routes';
import LoginScreen from 'sly/mobile/components/screens/LoginScreen';
import DashboardScreen from 'sly/mobile/components/screens/DashboardScreen';

const routes = [
  {
    path: '/',
    component: LoginScreen,
    exact: true,
  },
  {
    path: '/dashboard',
    component: DashboardScreen,
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

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  getChildContext = () => ({
    routes,
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView marginLeft={10} marginRight={10}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Switch>
              {routeComponents}
            </Switch>
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}
