/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import loadable from '@loadable/component';

import theme from 'sly/web/components/themes/default';
import { routes as routesPropType } from 'sly/web/propTypes/routes';
import { WIZARD_PATH, SEARCH_PATH } from 'sly/web/external/constants/paths';
import ErrorPage from 'sly/web/external/apps/ErrorPage';
import ExternalGlobalStyles from 'sly/web/external/apps/ExternalGlobalStyles';

const CareAssessmentControllerPage = loadable(() =>
  import(/* webpackChunkName: "chunkCareAssessmentControllerPage" */'sly/web/external/apps/wizards/careAssessment/Controller'));
const SearchContainerPage = loadable(() =>
  import(/* webpackChunkName: "chunkSearchContainerPage" */'sly/web/external/apps/search/Container'));

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
          <meta name="robots" content="noindex" />
          <style type="text/css">{ExternalGlobalStyles}</style>
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
