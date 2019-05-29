/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import theme from 'sly/components/themes/default';
import { routes as routesPropType } from 'sly/propTypes/routes';
import { WIZARD_PATH, SEARCH_PATH } from 'sly/external/constants/paths';
import ErrorPage from 'sly/external/apps/ErrorPage';
import addGlobalStyles from 'sly/external/apps/setGlobalStyles';
import CareAssessmentControllerPage from /* webpackChunkName: "chunkCareAssessmentControllerPage" */'sly/external/apps/wizards/careAssessment/Controller';
import SearchContainerPage from /* webpackChunkName: "chunkSearchContainerPage" */'sly/external/apps/search/Container';

addGlobalStyles();

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  getChildContext = () => ({
    routes: this.routes,
  });

  routes = [
    {
      path: `${WIZARD_PATH}/caw`,
      component: CareAssessmentControllerPage,
      exact: true,
    },
    {
      path: SEARCH_PATH,
      component: SearchContainerPage,
      exact: true,
    },
  ];

  render() {
    return (
      <>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="Seniorly Inc." property="author" />
          <meta content="English" property="language" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Switch>
            {this.routes.map(route => <Route key={route.path} {...route} />)}
            <Route render={routeProps => <ErrorPage {...routeProps} errorCode={404} />} />
          </Switch>
        </ThemeProvider>
      </>
    );
  }
}
