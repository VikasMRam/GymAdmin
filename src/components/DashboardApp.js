/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';
import loadable from '@loadable/component';

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
} from 'sly/constants/dashboardAppPaths';

import Router from 'sly/components/molecules/Router';

const Error = loadable(() => import(/* webpackChunkName: "chunkError" */ 'sly/components/pages/Error'));
const ChatBoxContainer = loadable(() => import(/* webpackChunkName: "chunkChatBox" */ 'sly/containers/ChatBoxContainer'));
const DashboardFavoritesPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardFavorites" */ 'sly/containers/DashboardFavoritesPageContainer'));
const DashboardMyProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/containers/DashboardMyProfilePageContainer'));
const DashboardMyFamiliesDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMyFamilies" */ 'sly/containers/DashboardMyFamiliesDetailsPageContainer'));
const DashboardAgentFamilyOverviewPageContainer = loadable(() => import(/* webpackChunkName: "chunkAgentFamilyOverview" */ 'sly/containers/DashboardAgentFamilyOverviewPageContainer'));

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
