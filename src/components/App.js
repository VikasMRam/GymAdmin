/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';

// https://github.com/diegohaz/arc/wiki/Styling

import { hideChatbox } from 'sly/config';
import theme from 'sly/components/themes/default';
import setGlobalStyles from 'sly/components/themes/setGlobalStyles';
import { assetPath } from 'sly/components/themes';
import { routes as routesPropType } from 'sly/propTypes/routes';

import Router from 'sly/components/molecules/Router';

import Error from /* webpackChunkName: "chunkError" */ 'sly/components/pages/Error';
import OurHistoryPage from /* webpackChunkName: "chunkOurHistory" */'sly/components/pages/OurHistoryPage';
import LegalPolicyPage from /* webpackChunkName: "chunkLegalPolicy" */ 'sly/components/pages/LegalPolicyPage';
import PartnersPage from /* webpackChunkName: "chunkPartners" */ 'sly/components/pages/PartnersPage';
import CommunityDetailPageContainer from /* webpackChunkName: "chunkCommunityDetail" */ 'sly/containers/CommunityDetailPageContainer';
import CommunitySearchPageContainer from /* webpackChunkName: "chunkCommunitySearch" */ 'sly/containers/CommunitySearchPageContainer';
import StateSearchPageContainer from /* webpackChunkName: "chunkStateSearch" */ 'sly/containers/StateSearchPageContainer';
import HomePageContainer from /* webpackChunkName: "chunkHomePage" */ 'sly/containers/HomePageContainer';
import NearMePageContainer from /* webpackChunkName: "chunkNearMe" */ 'sly/containers/NearMePageContainer';
import PromoPageContainer from /* webpackChunkName: "chunkPromo" */ 'sly/containers/PromoPageContainer';
import AgentsPageContainer from /* webpackChunkName: "chunkAgents" */ 'sly/containers/AgentsPageContainer';
import PasswordResetPageContainer from /* webpackChunkName: "chunkPasswordReset" */ 'sly/containers/PasswordResetPageContainer';
import HowItWorksDetailPageContainer from /* webpackChunkName: "chunkHowItWorks" */ 'sly/containers/HowItWorksDetailPageContainer';
import EntityApprovalContainer from /* webpackChunkName: "chunkEntityApprovalContainer" */ 'sly/containers/EntityApprovalContainer';
import BookATourPageContainer from /* webpackChunkName: "chunkBookATour" */ 'sly/containers/BookATourPageContainer';
import PricingWizardPageContainer from /* webpackChunkName: "chunkPricingWizard" */ 'sly/containers/PricingWizardPageContainer';
import AgentProfilePageContainer from /* webpackChunkName: "chunkAgentProfile" */ 'sly/containers/AgentProfilePageContainer';
import AgentRegionPageContainer from /* webpackChunkName: "chunkAgentRegion" */ 'sly/containers/AgentRegionPageContainer';
import ChatBoxContainer from /* webpackChunkName: "chunkChatBox" */ 'sly/containers/ChatBoxContainer';

setGlobalStyles();

const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'board-and-care-home',
  'memory-care',
  'continuing-care-retirement-community',
].join('|');

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

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  static routes = [
    {
      path: `/:toc(${careTypes})/:state/:city/:communitySlug`,
      component: CommunityDetailPageContainer,
      exact: true,
    },
    {
      path: `/:toc(${careTypes})/:state/:city`,
      component: CommunitySearchPageContainer,
      exact: true,
    },
    {
      path: `/:toc(${careTypes})/:state`,
      component: StateSearchPageContainer,
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
      exact: true,
    },
    {
      path: '/custom-pricing/:communitySlug',
      component: PricingWizardPageContainer,
      exact: true,
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
      path: '/',
      component: HomePageContainer,
      exact: true,
    },
    {
      path: '/assisted-living',
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
  ];

  getChildContext = () => ({
    routes: App.routes,
  });

  componentDidMount() {
    smoothscroll.polyfill();
  }

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Helmet titleTemplate="%s | Seniorly">
          <title>Find Local Senior Housing & Senior Care Services</title>
          <meta name="description" content="Local senior housing and senior care services for your loved ones. Find the best Senior Home by comparing pricing, availability, and amenities with Seniorly!" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          <Router bailRegex={/^\/dashboard/}>
            <Switch>
              <Route
                path="/ping"
                render={() => (<h1> pong </h1>)}
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
              {App.routes.map(route => <Route key={route.path} {...route} />)}
              <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
            </Switch>
          </Router>
        </ThemeProvider>
        {!hideChatbox && <ChatBoxContainer />}
      </Fragment>
    );
  }
}
