/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';
import loadable from '@loadable/component';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Modal from 'react-modal';

import ChatBoxProvider from '../services/chatbox/ChatBoxContext';

import { hideChatbox } from 'sly/web/config';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';
import { assetPath } from 'sly/web/components/themes';
import { routes as routesPropType } from 'sly/common/propTypes/routes';
import ChatBoxContainer from 'sly/web/containers/ChatBoxContainer';
import {
  RESOURCE_CENTER_PATH,
  RESOURCE_CENTER_AUTHOR_PATH,
  RESOURCE_CENTER_ARTICLE_PATH,
  RESOURCE_CENTER_TOPIC_PATH,
  RESOURCE_CENTER_SEARCH_PATH,
  RESOURCE_CENTER_SITEMAP_PATH,
} from 'sly/web/dashboard/dashboardAppPaths';
import careTypes from 'sly/web/constants/careTypes';
import hubTypes from 'sly/web/constants/hubTypes';
import PageEventsContainer from 'sly/web/containers/PageEventsContainer';
import UserCookiesContainer from 'sly/web/containers/UserCookiesContainer';
import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import { NotificationProvider } from 'sly/web/components/helpers/notification';
import { IconContext } from 'sly/common/system/Icon';
import { ApiProvider } from 'sly/web/services/api';
import theme from 'sly/common/system/theme';


Modal.setAppElement('#app');

const Error = loadable(() => import(/* webpackChunkName: "chunkError" */ 'sly/web/components/pages/Error'));
const OurHistoryPage = loadable(() => import(/* webpackChunkName: "chunkOurHistory" */'sly/web/components/pages/OurHistoryPage'));
const LegalPolicyPage = loadable(() => import(/* webpackChunkName: "chunkLegalPolicy" */ 'sly/web/components/pages/LegalPolicyPage'));
const PartnersPage = loadable(() => import(/* webpackChunkName: "chunkPartners" */ 'sly/web/components/pages/PartnersPage'));
const CommunityPartnersPageContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityPartners" */ 'sly/web/containers/CommunityPartnersPageContainer'));
const SearchContainer = loadable(() => import(/* webpackChunkName: "chunkSearchContainer" */ 'sly/web/components/search/SearchContainer'));
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
const EmailViewPageContainer = loadable(() => import(/* webpackChunkName: "emailView" */ 'sly/web/containers/EmailViewPageContainer'));
const EmailSharePageContainer = loadable(() => import(/* webpackChunkName: "emailShare" */ 'sly/web/containers/EmailSharePageFormContainer'));
const HousingPartnersPage = loadable(() => import(/* webpackChunkName: "chunkHousingPartners" */ 'sly/web/components/pages/HousingPartnersPage'));

// Dashboard
const Dashboard = loadable(() => import(/* webpackChunkName: "chunkDashboard" */ 'sly/web/dashboard/Dashboard'));

// community profile
const CommunityDetailPageContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityDetailPage" */ 'sly/web/profile/CommunityDetailPageContainer'));

// wizards
const AssessmentWizardPageContainer = loadable(() => import(/* webpackChunkName: "chunkAssessmentWizardPageContainer" */ 'sly/web/containers/AssessmentWizardPageContainer'));

const ResourceCenterHomePage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterHomePage" */ 'sly/web/components/resourceCenter'));
const ResourceCenterAuthorPage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterAuthorPage" */ 'sly/web/components/resourceCenter/Author'));
const ResourceCenterArticlePage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterArticlePage" */ 'sly/web/components/resourceCenter/Article'));
const ResourceCenterTopicPage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterTopicPage" */ 'sly/web/components/resourceCenter/Topic'));
const ResourceCenterSearchResultPage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterSearchPage" */ 'sly/web/components/resourceCenter/Search'));
const ResourceCenterSitemapPage = loadable(() => import(/* webpackChunkName: "chunkResourceCenterSitemap" */ 'sly/web/components/resourceCenter/Sitemap'));

// styleguide
const StyleGuide = loadable(() => import(/* webpackChunkName: "chunkStyleGuide" */ 'sly/web/styleguide/StyleGuide'));

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
    path: `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
    component: CommunityDetailPageContainer,
    exact: true,
  },
  {
    path: `/:toc(${careTypes.join('|')})/:state/:city`,
    component: SearchContainer,
    exact: true,
  },
  {
    path: `/:toc(${careTypes.join('|')})/:state`,
    component: SearchContainer,
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
    path: '/styleguide/:section',
    component: StyleGuide,
  },
  {
    path: '/',
    component: HomePageContainer,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_SITEMAP_PATH,
    component: ResourceCenterSitemapPage,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_PATH,
    component: ResourceCenterHomePage,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_AUTHOR_PATH,
    component: ResourceCenterAuthorPage,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_SEARCH_PATH,
    component: ResourceCenterSearchResultPage,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_TOPIC_PATH,
    component: ResourceCenterTopicPage,
    exact: true,
  },
  {
    path: RESOURCE_CENTER_ARTICLE_PATH,
    component: ResourceCenterArticlePage,
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
    const { apiContext, iconsContext, reduxStore } = this.props;
    return (
      <ApiProvider value={apiContext}>
        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            <IconContext.Provider value={iconsContext}>
              <ChatBoxProvider>
                <BreakpointProvider>
                  <NotificationProvider>
                    <PageEventsContainer />
                    <UserCookiesContainer />
                    <Helmet titleTemplate="%s | Seniorly" encodeSpecialCharacters>
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
                      <Route
                        path="/dashboard/*"
                        component={Dashboard}
                      />
                      {routeComponents}
                      <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
                    </Switch>
                    {/* {!hideChatbox && <ChatBoxContainer />} */}
                  </NotificationProvider>
                </BreakpointProvider>
              </ChatBoxProvider>
            </IconContext.Provider>
          </ThemeProvider>
        </Provider>
      </ApiProvider>
    );
  }
}
