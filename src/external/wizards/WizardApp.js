/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from 'sly/components/themes/default';
import setGlobalStyles from 'sly/components/themes/setGlobalStyles';

import { externalWizardsPath } from 'sly/config';
import { routes as routesPropType } from 'sly/propTypes/routes';
import WizardAppErrorPage from './WizardAppErrorPage';
import Router from 'sly/components/molecules/Router';

import { Controller as CAWController } from './caw';

setGlobalStyles();

export default class WizardApp extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  getChildContext = () => ({
    routes: this.routes,
  });

  routes = [
    {
      path: `${externalWizardsPath}/caw`,
      component: CAWController,
      exact: true,
    },
  ];

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <ThemeProvider theme={theme}>
          <Router enableEvents={false}>
            <Switch>
              {this.routes.map(route => <Route key={route.path} {...route} />)}
              <Route render={routeProps => <WizardAppErrorPage {...routeProps} errorCode={404} />} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Fragment>
    );
  }
}
