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

import { hideChatbox } from 'sly/web/config';
import theme from 'sly/common/components/themes/default';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';
import { assetPath } from 'sly/web/components/themes';
import { routes as routesPropType } from 'sly/common/propTypes/routes';
import Router from 'sly/web/components/molecules/Router';
import ChatBoxContainer from 'sly/web/containers/ChatBoxContainer';
import {
  DASHBOARD_PATH,
  DASHBOARD_ACCOUNT_PATH,
  FAMILY_DASHBOARD_FAVORITES_PATH,
  AGENT_DASHBOARD_PROFILE_PATH,
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  AGENT_DASHBOARD_MESSAGES_PATH,
  AGENT_DASHBOARD_TASKS_PATH,
  AGENT_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  ADMIN_DASHBOARD_CALLS_PATH,
  ADMIN_DASHBOARD_CALL_DETAILS_PATH, AGENT_DASHBOARD_CONTACTS_PATH,
  ADMIN_DASHBOARD_AGENTS_PATH,
  ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
  DASHBOARD_COMMUNITIES_PATH,
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
} from 'sly/web/constants/dashboardAppPaths';
import careTypes from 'sly/web/constants/careTypes';
import hubTypes from 'sly/web/constants/hubTypes';

const Error = loadable(() => import(/* webpackChunkName: "chunkError" */ 'sly/web/components/pages/Error'));
const OurHistoryPage = loadable(() => import(/* webpackChunkName: "chunkOurHistory" */'sly/web/components/pages/OurHistoryPage'));
const LegalPolicyPage = loadable(() => import(/* webpackChunkName: "chunkLegalPolicy" */ 'sly/web/components/pages/LegalPolicyPage'));
const PartnersPage = loadable(() => import(/* webpackChunkName: "chunkPartners" */ 'sly/web/components/pages/PartnersPage'));
const CommunityPartnersPageContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityPartners" */ 'sly/web/containers/CommunityPartnersPageContainer'));
const CommunitySearchPageContainer = loadable(() => import(/* webpackChunkName: "chunkCommunitySearch" */ 'sly/web/containers/CommunitySearchPageContainer'));
const SearchContainer = loadable(() => import(/* webpackChunkname: "chunkSearchContainer" */ 'sly/web/components/search/SearchContainer'));
const StateSearchPageContainer = loadable(() => import(/* webpackChunkName: "chunkStateSearch" */ 'sly/web/containers/StateSearchPageContainer'));
const HomePageContainer = loadable(() => import(/* webpackChunkName: "chunkHomePage" */ 'sly/web/containers/HomePageContainer'));
const NearMePageContainer = loadable(() => import(/* webpackChunkName: "chunkNearMe" */ 'sly/web/containers/NearMePageContainer'));
const AgentsPageContainer = loadable(() => import(/* webpackChunkName: "chunkAgents" */ 'sly/web/containers/AgentsPageContainer'));
const PasswordResetPageContainer = loadable(() => import(/* webpackChunkName: "chunkPasswordReset" */ 'sly/web/containers/PasswordResetPageContainer'));
const HowItWorksDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkHowItWorks" */ 'sly/web/containers/HowItWorksDetailPageContainer'));
const EntityApprovalContainer = loadable(() => import(/* webpackChunkName: "chunkEntityApprovalContainer" */ 'sly/web/containers/EntityApprovalContainer'));
const BookATourPageContainer = loadable(() => import(/* webpackChunkName: "chunkBookATour" */ 'sly/web/containers/BookATourPageContainer'));
const PricingWizardPageContainer = loadable(() => import(/* webpackChunkName: "chunkPricingWizard" */ 'sly/web/containers/PricingWizardPageContainer'));
const AgentProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkAgentProfile" */ 'sly/web/containers/AgentProfilePageContainer'));
const AgentRegionPageContainer = loadable(() => import(/* webpackChunkName: "chunkAgentRegion" */ 'sly/web/containers/AgentRegionPageContainer'));
const CareTypeGuideContainer = loadable(() => import(/* webpackChunkName: "chunkCTGuide" */ 'sly/web/containers/CareTypeGuideContainer'));
const CareTypeRegionGuideContainer = loadable(() => import(/* webpackChunkName: "chunkRegionGuide" */ 'sly/web/containers/CareTypeRegionGuideContainer'));
const CurtainUpPageContainer = loadable(() => import(/* webpackChunkName: "chunkCurtainUp" */ 'sly/web/containers/CurtainUpPageContainer'));
const EmailViewPageContainer = loadable(() => import(/* webpackChunkName: "emailView" */ 'sly/web/containers/EmailViewPageContainer'));
const EmailSharePageContainer = loadable(() => import(/* webpackChunkName: "emailShare" */ 'sly/web/containers/EmailSharePageFormContainer'));
const HousingPartnersPage = loadable(() => import(/* webpackChunkName: "chunkHousingPartners" */ 'sly/web/components/pages/HousingPartnersPage'));

// Dashboard
const DashboardHomePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardHomePage" */ 'sly/web/containers/DashboardHomePageContainer'));
const DashboardFavoritesPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardFavorites" */ 'sly/web/containers/DashboardFavoritesPageContainer'));
const DashboardMyAccountPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyAccount" */ 'sly/web/containers/DashboardMyAccountPageContainer'));
const DashboardAgentProfilePageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/web/containers/DashboardAgentProfilePageContainer'));
const DashboardAgentDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardMyProfile" */ 'sly/web/containers/DashboardAgentDetailPageContainer'));

const DashboardMyFamiliesDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMyFamilies" */ 'sly/web/containers/DashboardMyFamiliesDetailsPageContainer'));
const DashboardAgentFamilyOverviewPage = loadable(() => import(/* webpackChunkName: "chunkAgentFamilyOverview" */ 'sly/web/components/pages/DashboardAgentFamilyOverviewPage'));
const DashboardMessagesPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessagesOverview" */ 'sly/web/containers/DashboardMessagesPageContainer'));
const DashboardMessageDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkMessageDetails" */ 'sly/web/containers/DashboardMessageDetailsPageContainer'));
const DashboardCallsIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkAdminCallsOverview" */ 'sly/web/containers/DashboardCallsIndexPageContainer'));
const DashboardCallDetailsPageContainer = loadable(() => import(/* webpackChunkName: "chunkAdminCallDetails" */ 'sly/web/containers/DashboardCallDetailsPageContainer'));
const DashboardAgentTasksPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentTasks" */ 'sly/web/components/pages/DashboardAgentTasksPage'));
const DashboardAgentContactsPage = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentContacts" */ 'sly/web/components/pages/DashboardAgentContactsPage'));
const DashboardAgentsIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardAgentsIndex" */ 'sly/web/containers/dashboard/agents/DashboardAgentsIndexPageContainer'));
const DashboardCommunityIndexPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardCommunityIndex" */ 'sly/web/containers/DashboardCommunityIndexPageContainer'));
const DashboardCommunityDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkDashboardCommunityDetail" */ 'sly/web/containers/DashboardCommunityDetailsPageContainer'));

// wizards
const AssessmentWizardPageContainer = loadable(() => import(/* webpackChunkName: "chunkAssessmentWizardPageContainer" */ 'sly/web/containers/AssessmentWizardPageContainer'));

dayjs.extend(advancedFormat);
dayjs.extend(utc);

const careTypeGuides = ['assisted-living-guide', 'memory-care-guide'].join('|');

const howItWorksTypes = [
  'consumers',
  'providers',
  'agents',
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
    path: '/partners/housing',
    component: HousingPartnersPage,
  },
  {
    path: '/agents',
    component: AgentsPageContainer,
    exact: true,
  },
  {
    path: '/partners/agents',
    component: PartnersPage,
    exact: true,
  },
  {
    path: '/partners/communities',
    component: CommunityPartnersPageContainer,
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
    path: `/:hub(${hubTypes.join('|')})`,
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
    path: '/email/view/:id',
    component: EmailViewPageContainer,
  },
  {
    path: '/email/share/:id',
    component: EmailSharePageContainer,
  },
  {
    path: '/curtainup',
    component: CurtainUpPageContainer,
    exact: true,
  },
  {
    path: '/wizards/assessment/community/:communityId',
    component: AssessmentWizardPageContainer,
    exact: true,
  },
  {
    path: '/wizards/assessment/location/:state/:city',
    component: AssessmentWizardPageContainer,
    exact: true,
  },
  {
    path: '/wizards/assessment',
    component: AssessmentWizardPageContainer,
    exact: true,
  },
  {
    path: `/nusearch/:toc(${careTypes.join('|')})/:state/:city`,
    component: SearchContainer,
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
    component={Component}
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

          {/*
            Google Optimize
          */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="script-src * https://optimize.google.com 'unsafe-inline' 'unsafe-eval'; style-src * https://optimize.google.com https://fonts.googleapis.com 'unsafe-inline'; img-src * https://optimize.google.com 'self' data:; font-src * https://fonts.gstatic.com; frame-src * https://optimize.google.com https://createaclickablemap.com https://www.youtube.com https://vars.hotjar.com"
          />

          <link rel="shortcut icon" type="image/x-icon" href={assetPath('favicon.ico')} />
          <style type="text/css">{GlobalStyles}</style>
        </Helmet>

        <ThemeProvider theme={theme}>
          <Router requiresAuth={[/^\/dashboard/]}>
            <Switch>
              <Route
                path="/ping"
                render={() => <h1>pong</h1>}
                exact
              />
              <Route
                path="/ads.txt"
                render={() => 'google.com, pub-7265665320394778, DIRECT, f08c47fec0942fa0'}
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
          {!hideChatbox && <ChatBoxContainer />}
        </ThemeProvider>
      </>
    );
  }
}
