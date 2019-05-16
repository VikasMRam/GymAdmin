/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';

import theme from 'sly/components/themes/default';
import setGlobalStyles from 'sly/components/themes/setGlobalStyles';
import { assetPath } from 'sly/components/themes';
import DashboardHomePageContainer from 'sly/containers/DashboardHomePageContainer';
import { routes as routesPropType } from 'sly/propTypes/routes';
import {
  DASHBOARD_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  FAMILY_DASHBOARD_PROFILE_PATH,
  FAMILY_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH,
  ADMIN_DASHBOARD_CALLS_PATH,
  ADMIN_DASHBOARD_CALLS_DETAILS_PATH,
} from 'sly/constants/dashboardAppPaths';
import Error from 'sly/components/pages/Error';
import Router from 'sly/components/molecules/Router';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';
import DashboardFavoritesPageContainer from 'sly/containers/DashboardFavoritesPageContainer';
import DashboardMyProfilePageContainer from 'sly/containers/DashboardMyProfilePageContainer';
import DashboardMyFamiliesDetailsPageContainer from 'sly/containers/DashboardMyFamiliesDetailsPageContainer';
import DashboardAgentFamilyOverviewPageContainer from 'sly/containers/DashboardAgentFamilyOverviewPageContainer';
import DashboardCallsIndexPageContainer from 'sly/containers/DashboardCallsIndexPageContainer';
import DashboardCallsDetailsPageContainer from 'sly/containers/DashboardCallsDetailsPageContainer';

setGlobalStyles();

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  static routes = [
    {
      path: DASHBOARD_PATH,
      component: DashboardHomePageContainer,
      exact: true,
    },
    {
      path: FAMILY_DASHBOARD_FAVORITES_PATH,
      component: DashboardFavoritesPageContainer,
      exact: true,
    },
    {
      path: FAMILY_DASHBOARD_PROFILE_PATH,
      component: DashboardMyProfilePageContainer,
      exact: true,
    },
    {
      path: FAMILY_DASHBOARD_FAMILIES_PATH,
      component: DashboardAgentFamilyOverviewPageContainer,
      exact: true,
    },
    {
      path: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH,
      component: DashboardMyFamiliesDetailsPageContainer,
    },
    {
      path: ADMIN_DASHBOARD_CALLS_PATH,
      component: DashboardCallsIndexPageContainer,
      exact: true,
    },
    {
      path: ADMIN_DASHBOARD_CALLS_DETAILS_PATH,
      component: DashboardCallsDetailsPageContainer,
      exact: true,
    },
  ];

  getChildContext = () => ({
    routes: this.routes,
  });

  componentDidMount() {
    smoothscroll.polyfill();
  }

  render() {
    return (
      <Fragment>
        <Helmet titleTemplate="%s | Seniorly">
          <title>Find Local Senior Housing & Senior Care Services</title>
          <meta name="description" content="Local senior housing and senior care services for your loved ones. Find the best Senior Home by comparing pricing, availability, and amenities with Seniorly!" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="Seniorly Inc." property="author" />
          <meta content="English" property="language" />

          <link rel="shortcut icon" type="image/x-icon" href={assetPath('favicon.ico')} />
        </Helmet>

        <ThemeProvider theme={theme}>
          <Router bailRegex={/^\/(?!dashboard)/} requiresAuth>
            <Switch>
              {App.routes.map(route => <Route key={route.path} {...route} />)}
              <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
            </Switch>
          </Router>
        </ThemeProvider>
        <ChatBoxContainer />
      </Fragment>
    );
  }
}
