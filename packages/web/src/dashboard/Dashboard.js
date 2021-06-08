import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

import NotificationSubscriptions from 'sly/web/services/notifications/Subscriptions';
import WSProvider from 'sly/web/services/ws/WSProvider';
import Router from 'sly/web/components/molecules/Router';
import { ThemeProvider } from 'styled-components';

// Dashboard
const DashboardHomePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardHomePage" */ 'sly/web/containers/DashboardHomePageContainer'));
const DashboardFamilyHomePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardFavorites" */ 'sly/web/containers/dashboard/families/HomeBasePageContainer'));
const DashboardFavoritesPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardFavorites" */ 'sly/web/containers/DashboardFavoritesPageContainer'));
const DashboardMyAccountPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyAccount" */ 'sly/web/containers/DashboardMyAccountPageContainer'));
const DashboardAgentProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/web/containers/DashboardAgentProfilePageContainer'));
const DashboardAgentDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/web/containers/DashboardAgentDetailPageContainer'));

const DashboardMyFamiliesDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMyFamilies" */ 'sly/web/containers/DashboardMyFamiliesDetailsPageContainer'));
const DashboardAgentFamilyOverviewPage = loadable(() => import(/* webpackChunkName: "chunkAgentFamilyOverview" */ 'sly/web/components/pages/DashboardAgentFamilyOverviewPage'));
const DashboardMessagesPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessagesOverview" */ 'sly/web/containers/DashboardMessagesPageContainer'));
const DashboardMessageDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessageDetails" */ 'sly/web/containers/DashboardMessageDetailsPageContainer'));
const DashboardAgentTasksPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentTasks" */ 'sly/web/components/pages/DashboardAgentTasksPage'));
const DashboardAgentContactsPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentContacts" */ 'sly/web/components/pages/DashboardAgentContactsPage'));
const DashboardAgentsIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentsIndex" */ 'sly/web/containers/dashboard/agents/DashboardAgentsIndexPageContainer'));
const DashboardCommunityIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardCommunityIndex" */ 'sly/web/dashboard/communities/DashboardCommunityIndexPageContainer'));
const DashboardCommunityDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardCommunityDetail" */ 'sly/web/dashboard/communities/DashboardCommunityDetailsPageContainer'));

import themeWithLegacy from 'sly/common/components/themes/themeWithLegacy';

import {
  DASHBOARD_PATH,
  DASHBOARD_ACCOUNT_PATH,
  FAMILY_DASHBOARD_HOME_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  AGENT_DASHBOARD_PROFILE_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_TASKS_PATH,
  AGENT_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_CONTACTS_PATH,
  ADMIN_DASHBOARD_AGENTS_PATH,
  ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
  DASHBOARD_COMMUNITIES_PATH,
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
} from 'sly/web/dashboard/dashboardAppPaths';

const routes = [
  {
    path: DASHBOARD_PATH,
    component: DashboardHomePageContainer,
    exact: true,
  },
  {
    path: FAMILY_DASHBOARD_HOME_PATH,
    component: DashboardFamilyHomePageContainer,
    exact: true,
  },
  {
    path: FAMILY_DASHBOARD_FAVORITES_PATH,
    component: DashboardFavoritesPageContainer,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_FAMILIES_PATH,
    component: DashboardAgentFamilyOverviewPage,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_MESSAGES_PATH,
    component: DashboardMessagesPageContainer,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_TASKS_PATH,
    component: DashboardAgentTasksPage,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_CONTACTS_PATH,
    component: DashboardAgentContactsPage,
  },
  {
    path: FAMILY_DASHBOARD_MESSAGES_PATH,
    component: DashboardMessagesPageContainer,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
    component: DashboardMyFamiliesDetailsPageContainer,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_MESSAGE_DETAILS_PATH,
    component: DashboardMessageDetailsPageContainer,
    exact: true,
  },
  {
    path: FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH,
    component: DashboardMessageDetailsPageContainer,
    exact: true,
  },
  {
    path: DASHBOARD_ACCOUNT_PATH,
    component: DashboardMyAccountPageContainer,
    exact: true,
  },
  {
    path: AGENT_DASHBOARD_PROFILE_PATH,
    component: DashboardAgentProfilePageContainer,
    exact: true,
  },
  {
    path: ADMIN_DASHBOARD_AGENTS_PATH,
    component: DashboardAgentsIndexPageContainer,
    exact: true,
  },
  {
    path: ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
    component: DashboardAgentDetailPageContainer,
  },
  {
    path: DASHBOARD_COMMUNITIES_DETAIL_PATH,
    component: DashboardCommunityDetailPageContainer,
  },
  {
    path: DASHBOARD_COMMUNITIES_PATH,
    component: DashboardCommunityIndexPageContainer,
  },
];

const routeComponents = routes.map(({ component: Component, ...route }) => (
  <Route
    key={route.path}
    {...route}
    component={Component}
  />
));

const Dashboard = () => (
  <ThemeProvider theme={themeWithLegacy}>
    <Router requiresAuth={[/^\/dashboard/]}>
      <WSProvider>
        <NotificationSubscriptions>
          <Switch>
            {routeComponents}
          </Switch>
        </NotificationSubscriptions>
      </WSProvider>
    </Router>
  </ThemeProvider>
);

export default Dashboard;
