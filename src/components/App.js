/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';
import loadable from '@loadable/component';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

// https://github.com/diegohaz/arc/wiki/Styling

import { hideChatbox } from 'sly/config';
import theme from 'sly/components/themes/default';
import GlobalStyles from 'sly/components/themes/GlobalStyles';
import { assetPath } from 'sly/components/themes';
import { routes as routesPropType } from 'sly/propTypes/routes';
import Router from 'sly/components/molecules/Router';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';
import {
  DASHBOARD_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  FAMILY_DASHBOARD_PROFILE_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_TASKS_PATH,
  AGENT_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  ADMIN_DASHBOARD_CALLS_PATH,
  ADMIN_DASHBOARD_CALL_DETAILS_PATH, AGENT_DASHBOARD_CONTACTS_PATH,
} from 'sly/constants/dashboardAppPaths';
import careTypes from 'sly/constants/careTypes';
import PageEventsContainer from 'sly/containers/PageEventsContainer';

const Error = loadable(() => import(/* webpackChunkName: "chunkError" */ 'sly/components/pages/Error'));
const OurHistoryPage = loadable(() => import(/* webpackChunkName: "chunkOurHistory" */'sly/components/pages/OurHistoryPage'));
const LegalPolicyPage = loadable(() => import(/* webpackChunkName: "chunkLegalPolicy" */ 'sly/components/pages/LegalPolicyPage'));
const PartnersPage = loadable(() => import(/* webpackChunkName: "chunkPartners" */ 'sly/components/pages/PartnersPage'));
const CommunitySearchPageContainer = loadable(() => import(/* webpackChunkName: "chunkCommunitySearch" */ 'sly/containers/CommunitySearchPageContainer'));
const StateSearchPageContainer = loadable(() => import(/* webpackChunkName: "chunkStateSearch" */ 'sly/containers/StateSearchPageContainer'));
const HomePageContainer = loadable(() => import(/* webpackChunkName: "chunkHomePage" */ 'sly/containers/HomePageContainer'));
const NearMePageContainer = loadable(() => import(/* webpackChunkName: "chunkNearMe" */ 'sly/containers/NearMePageContainer'));
const PromoPageContainer = loadable(() => import(/* webpackChunkName: "chunkPromo" */ 'sly/containers/PromoPageContainer'));
const AgentsPageContainer = loadable(() => import(/* webpackChunkName: "chunkAgents" */ 'sly/containers/AgentsPageContainer'));
const PasswordResetPageContainer = loadable(() => import(/* webpackChunkName: "chunkPasswordReset" */ 'sly/containers/PasswordResetPageContainer'));
const HowItWorksDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkHowItWorks" */ 'sly/containers/HowItWorksDetailPageContainer'));
const EntityApprovalContainer = loadable(() => import(/* webpackChunkName: "chunkEntityApprovalContainer" */ 'sly/containers/EntityApprovalContainer'));
const BookATourPageContainer = loadable(() => import(/* webpackChunkName: "chunkBookATour" */ 'sly/containers/BookATourPageContainer'));
const PricingWizardPageContainer = loadable(() => import(/* webpackChunkName: "chunkPricingWizard" */ 'sly/containers/PricingWizardPageContainer'));
const AgentProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkAgentProfile" */ 'sly/containers/AgentProfilePageContainer'));
const AgentRegionPageContainer = loadable(() => import(/* webpackChunkName: "chunkAgentRegion" */ 'sly/containers/AgentRegionPageContainer'));
const CareTypeGuideContainer = loadable(() => import(/* webpackChunkName: "chunkCTGuide" */ 'sly/containers/CareTypeGuideContainer'));
const CareTypeRegionGuideContainer = loadable(() => import(/* webpackChunkName: "chunkRegionGuide" */ 'sly/containers/CareTypeRegionGuideContainer'));

// Dashboard
const DashboardHomePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardHomePage" */ 'sly/containers/DashboardHomePageContainer'));
const DashboardFavoritesPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardFavorites" */ 'sly/containers/DashboardFavoritesPageContainer'));
const DashboardMyProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/containers/DashboardMyProfilePageContainer'));

const DashboardMyFamiliesDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMyFamilies" */ 'sly/containers/DashboardMyFamiliesDetailsPageContainer'));
const DashboardAgentFamilyOverviewPage = loadable(() => import(/* webpackChunkName: "chunkAgentFamilyOverview" */ 'sly/components/pages/DashboardAgentFamilyOverviewPage'));
const DashboardMessagesPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessagesOverview" */ 'sly/containers/DashboardMessagesPageContainer'));
const DashboardMessageDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessageDetails" */ 'sly/containers/DashboardMessageDetailsPageContainer'));
const DashboardCallsIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkAdminCallsOverview" */ 'sly/containers/DashboardCallsIndexPageContainer'));
const DashboardCallDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkAdminCallDetails" */ 'sly/containers/DashboardCallDetailsPageContainer'));
const DashboardAgentTasksPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentTasks" */ 'sly/components/pages/DashboardAgentTasksPage'));
const DashboardAgentContactsPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentContacts" */ 'sly/components/pages/DashboardAgentContactsPage'));

dayjs.extend(advancedFormat);
dayjs.extend(utc);

const careTypeGuides = ['assisted-living-guide', 'memory-care-guide'].join('|');

const howItWorksTypes = [
  'consumers',
  'providers',
  'agents',
].join('|');

const promoTypes = [
  'promo',
  'rebate',
].join('|');

const legalPages = [
  'privacy',
  'tos',
].join('|');

const TempHowItWorks = ({ ...props }) => (
  <HowItWorksDetailPageContainer
    {...props}
    match={{ params: { type: 'consumers' } }}
  />
);

const routes = [
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
    path: ADMIN_DASHBOARD_CALLS_PATH,
    component: DashboardCallsIndexPageContainer,
    exact: true,
  },
  {
    path: ADMIN_DASHBOARD_CALL_DETAILS_PATH,
    component: DashboardCallDetailsPageContainer,
  },
  {
    path: `/:toc(${careTypes.join('|')})/:state/:city`,
    component: CommunitySearchPageContainer,
    exact: true,
  },
  {
    path: `/:toc(${careTypes.join('|')})/:state`,
    component: StateSearchPageContainer,
    exact: true,
  },
  {
    path: `/:tocg(${careTypeGuides})`,
    component: CareTypeGuideContainer,
    exact: true,
  },
  {
    path: `/:tocg(${careTypeGuides})/:region`,
    component: CareTypeRegionGuideContainer,
    exact: true,
  },
  {
    path: '/agents',
    component: AgentsPageContainer,
    exact: true,
  },
  {
    path: '/agents/partners',
    component: PartnersPage,
    exact: true,
  },
  {
    path: '/agents/:region/:city/:agentSlug',
    component: AgentProfilePageContainer,
    exact: true,
  },
  {
    path: '/agents/:region/:city/',
    component: AgentRegionPageContainer,
    exact: true,
  },
  {
    path: '/agents/:region',
    component: AgentRegionPageContainer,
    exact: true,
  },
  {
    path: `/how-it-works/:type(${howItWorksTypes})`,
    component: HowItWorksDetailPageContainer,
  },
  {
    path: '/how-it-works',
    component: TempHowItWorks,
    exact: true,
  },
  {
    path: '/book-a-tour/:communitySlug',
    component: BookATourPageContainer,
  },
  {
    path: '/custom-pricing/:communitySlug',
    component: PricingWizardPageContainer,
  },
  {
    path: '/about/:member?',
    component: OurHistoryPage,
    exact: true,
  },
  {
    path: `/:promo(${promoTypes})`,
    component: PromoPageContainer,
    exact: true,
  },
  {
    path: '/assisted-living',
    component: NearMePageContainer,
    exact: true,
  },
  {
    path: '/nursing-homes',
    component: NearMePageContainer,
    exact: true,
  },
  {
    path: '/skilled-nursing-facility',
    component: NearMePageContainer,
    exact: true,
  },
  {
    path: `/:legalPage(${legalPages})`,
    component: LegalPolicyPage,
    exact: true,
  },
  {
    path: '/:entity/:entitySlug/approve',
    component: EntityApprovalContainer,
    exact: true,
  },
  {
    path: '/users/password-reset',
    component: PasswordResetPageContainer,
    exact: true,
  },
  {
    path: '/',
    component: HomePageContainer,
    exact: true,
  },
];

const routeComponents = routes.map(({ component: Component, ...route }) => (
  <Route
    key={route.path}
    {...route}
    component={props => (
      <>
        <PageEventsContainer />
        <Component {...props} />
      </>
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

  componentDidMount() {
    smoothscroll.polyfill();
  }

  render() {
    return (
      <>
        <Helmet titleTemplate="%s | Seniorly">
          <title>Find The Best Senior Living Options Near You</title>
          <meta name="description" content="Local senior housing and senior care services for your loved ones. Find the best senior living home by comparing pricing, availability, and amenities with Seniorly!" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="Seniorly" property="author" />
          <meta content="English" property="language" />

          {/*
            Open graph
          */}
          <meta property="og:site_name" content="Seniorly" />
          <meta property="og:site_url" content="https://www.seniorly.com" />
          <meta property="og:type" content="website" />

          {/*
            Twitter
          */}
          <meta content="summary" property="twitter:card" />
          <meta content="https://www.seniorly.com" property="twitter:site" />
          <meta content="@seniorly" property="twitter:creator" />

          <link rel="shortcut icon" type="image/x-icon" href={assetPath('favicon.ico')} />
        </Helmet>

        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router requiresAuth={[/^\/dashboard/]}>
            <Switch>
              <Route
                path="/ping"
                render={() => <h1>pong</h1>}
                exact
              />
              <Route
                path={`/:toc(${careTypes})/:state/:city/filters`}
                render={({ match }) => (
                  <Redirect
                    to={`/${match.params.toc}/${match.params.state}/${match.params.city}`}
                  />
                )}
              />
              {routeComponents}
              <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
            </Switch>
          </Router>
        </ThemeProvider>
        {!hideChatbox && <ChatBoxContainer />}
      </>
    );
  }
}
