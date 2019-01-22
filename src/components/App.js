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
import { facebookPixelId, googleTagManagerId, isProd, googleAppId, rokoApiKey } from 'sly/config';
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

const ignoreSearchPrams = [
  'modal',
  'action',
  'entityId',
  'currentStep',
  'token',
  'modal',
];

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };
  static propTypes = {
    fetchUser: func,
  }

  getChildContext = () => ({
    routes: this.routes,
  });

  componentDidMount() {
    const { fetchUser } = this.props;
    smoothscroll.polyfill();
    fetchUser()
      // eslint-disable-next-line no-console
      .catch(() => console.error('Not logged in'));
  }

  routes = [
    {
      path: `/:toc(${careTypes})/:state/:city/:communitySlug`,
      component: props => <CommunityDetailPageController ignoreSearch={ignoreSearchPrams} {...props} />,
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
            Google Tag Mabager
          */}
          <script dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');`,
          }}
          />

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

          {/*
            Google Platform Library
          */}
          <meta name="google-signin-client_id" content={googleAppId} />

          <link rel="shortcut icon" type="image/x-icon" href={assetPath('favicon.ico')} />
          {/* eslint-disable */}

          {/* Google Tag Manager */}
          <script type="text/javascript" defer="true">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          `}</script>
          <noscript>
            {`<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" />`}
          </noscript>
          {/* End Google Tag Manager */}

          {/* Begin Inspectlet Asynchronous Code */}
          {
            (isProd) && (
              <script type="text/javascript" defer="true">{`
                (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1731141391]);
                var ldinsp = function(){
                if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1731141391&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 0);
              })();
            `}</script>
            )
          }
          {/* End Inspectlet Asynchronous Code */}

          {/* Begin Instabot Code */}
          <script type="text/javascript"
                  src ="//app.instabot.io/jsapi/v2/rokoInstabot.js"
                  async="true" defer="true">
            {`apiKey: '${rokoApiKey}'`}
          </script>
          {/* End Instabot Code */}

          {/* Begin Google Platform Library Code */}
          <script type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
          {/* End Google Platform Library Code */}

          {/* eslint-enable */}
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

      </Fragment>
    );
  }
}
