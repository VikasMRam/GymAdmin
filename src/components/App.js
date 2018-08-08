/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';
import { func } from 'prop-types';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

import { facebookPixelId, googleTagManagerId, isProd } from 'sly/config';
import { assetPath } from 'sly/components/themes';
// import AppController from 'sly/controllers/Appcontroller';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import CommunitySearchPageContainer from 'sly/containers/CommunitySearchPageContainer';
import StateSearchPageContainer from 'sly/containers/StateSearchPageContainer';
import HomePageContainer from 'sly/containers/HomePageContainer';
import PromoPageContainer from 'sly/containers/PromoPageContainer';
import AgentsProfilePageController from 'sly/controllers/AgentsProfilePageController';
import OurHistoryPage from 'sly/components/pages/OurHistoryPage';
import HowItWorksPage from 'sly/components/pages/HowItWorksPage';
import HowItWorksDetailPageContainer from 'sly/containers/HowItWorksDetailPageContainer';
import { routes as routesPropType } from 'sly/propTypes/routes';
import Error from 'sly/components/pages/Error';
import Router from 'sly/components/molecules/Router';

setGlobalStyles();

const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'alzheimers-care',
  'continuing-care-retirement-community'
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

const TempHowItWorks = ({ ...props }) => (
  <HowItWorksDetailPageContainer
    {...props}
    match={{params:{type: 'consumers'}}}
  />
);

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
      .catch(error => {
        console.error('Not logged in');
      });
  }

  routes = [
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
      component: AgentsProfilePageController,
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
          <script  dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');`}}
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


        {/* eslint-disable */}
        {/* Facebook Pixel Code */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${facebookPixelId}');
          fbq('track', 'PageView');`}}
        />
        <noscript>
          <img height="1" width="1" src="https://www.facebook.com/tr?id=586147298262302&ev=PageView&noscript=1"/>
        </noscript>
        {/* End Facebook Pixel Code */}

        {/* Google Tag Manager */}

        <script  dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');`}}
        />
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`} height="0" width="0" style={{display: 'none', visibility: 'hidden'}}/>
        </noscript>
        {/* End Google Tag Manager */}

        {/* Begin Inspectlet Asynchronous Code */}
        {
          (isProd) && (
            <script dangerouslySetInnerHTML={{ __html: `
                (function() {
                window.__insp = window.__insp || [];
                __insp.push(['wid', 1731141391]);
                var ldinsp = function(){
                if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=1731141391&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
                setTimeout(ldinsp, 0);
              })();`}}
            />
          )
        }
        {/* End Inspectlet Asynchronous Code */}

        {/* eslint-enable */}
      </Fragment>
    );
  }
}
