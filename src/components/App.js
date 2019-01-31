/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';
import { func } from 'prop-types';

// https://github.com/diegohaz/arc/wiki/Styling

import theme from 'sly/components/themes/default';
import setGlobalStyles from 'sly/components/themes/setGlobalStyles';
import { assetPath } from 'sly/components/themes';
// import AppController from 'sly/controllers/Appcontroller';
import CommunityDetailPageController from 'sly/controllers/CommunityDetailPageController';
import CommunitySearchPageContainer from 'sly/containers/CommunitySearchPageContainer';
import StateSearchPageContainer from 'sly/containers/StateSearchPageContainer';
import HomePageContainer from 'sly/containers/HomePageContainer';
import NearMePageContainer from 'sly/containers/NearMePageContainer';
import PromoPageContainer from 'sly/containers/PromoPageContainer';
import AgentsPageContainer from 'sly/containers/AgentsPageContainer';
import OurHistoryPage from 'sly/components/pages/OurHistoryPage';
import PasswordResetPageContainer from 'sly/containers/PasswordResetPageContainer';
import HowItWorksDetailPageContainer from 'sly/containers/HowItWorksDetailPageContainer';
import { routes as routesPropType } from 'sly/propTypes/routes';
import Error from 'sly/components/pages/Error';
import Router from 'sly/components/molecules/Router';
import LegalPolicyPage from 'sly/components/pages/LegalPolicyPage';
import EntityApprovalContainer from 'sly/containers/EntityApprovalContainer';
import BookATourPageContainer from 'sly/containers/BookATourPageContainer';
import PricingWizardPageContainer from 'sly/containers/PricingWizardPageContainer';
import AgentProfilePageContainer from 'sly/containers/AgentProfilePageContainer';
import AgentRegionPageContainer from 'sly/containers/AgentRegionPageContainer';
import PartnersPage from 'sly/components/pages/PartnersPage';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';

setGlobalStyles();

const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
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

  getChildContext = () => ({
    routes: this.routes,
  });

  componentDidMount() {
    smoothscroll.polyfill();
  }

  routes = [
    {
      path: `/:toc(${careTypes})/:state/:city/:communitySlug`,
      component: CommunityDetailPageController,
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

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Helmet titleTemplate="%s | Seniorly">
          <title>Find Local Senior Housing & Senior Care Services</title>
          <meta name="description" content="Local senior housing and senior care services for your loved ones. Find the best Senior Home by comparing pricing, availability, and amenities with Seniorly!" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content="Seniorly Inc." property="author" />
          <meta content="English" property="language" />

          {/*
            Open graph
          */}
          <meta property="og:site_name" content="Seniorly" />
          <meta property="og:site_url" content="https://wwww.seniorly.com" />
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
          <Router>
            <Switch>
              <Route
                path={`/:toc(${careTypes})/:state/:city/filters`}
                render={({ match }) => (
                  <Redirect
                    to={`/${match.params.toc}/${match.params.state}/${match.params.city}`}
                  />
                )}
              />
              {this.routes.map(route => <Route key={route.path} {...route} />)}
              <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
            </Switch>
          </Router>
        </ThemeProvider>

        <ChatBoxContainer />
      </Fragment>
    );
  }
}
