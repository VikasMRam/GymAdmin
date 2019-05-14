/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import theme from 'sly/components/themes/default';
import { routes as routesPropType } from 'sly/propTypes/routes';
import { WIZARD_PATH } from 'sly/external/constants/paths';
import WizardAppErrorPage from 'sly/external/wizards/WizardAppErrorPage';
import addGlobalStyles from 'sly/external/wizards/setGlobalStyles';
import { Controller as CareAssessmentController } from 'sly/external/wizards/careAssessment';

addGlobalStyles();

export default class WizardApp extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  getChildContext = () => ({
    routes: this.routes,
  });

  routes = [
    {
      path: `${WIZARD_PATH}/caw`,
      component: CareAssessmentController,
      exact: true,
    },
  ];

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="Seniorly Inc." property="author" />
          <meta content="English" property="language" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Switch>
            {this.routes.map(route => <Route key={route.path} {...route} />)}
            <Route render={routeProps => <WizardAppErrorPage {...routeProps} errorCode={404} />} />
          </Switch>
        </ThemeProvider>
      </Fragment>
    );
  }
}
