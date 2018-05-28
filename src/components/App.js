import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';

import { isBrowser } from 'sly/config';
// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

import { assetPath } from 'sly/components/themes';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import CommunitySearchPageContainer from 'sly/containers/CommunitySearchPageContainer';
import StateSearchPageContainer from 'sly/containers/StateSearchPageContainer';
import HomePageContainer from 'sly/containers/HomePageContainer';
import { routes as routesPropType } from 'sly/propTypes/routes';
import Error from 'sly/components/pages/Error';
import ScrollToTopRoute from 'sly/components/ScrollToTopRoute';

setGlobalStyles();

const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'alzheimers-care',
].join('|');

export default class App extends Component {
  static childContextTypes = {
    routes: routesPropType,
  };

  getChildContext = () => ({
    routes: this.routes,
  });

  componentDidMount() {
    // this is not required when running in test env created by jsdom
    if (isBrowser) {
      smoothscroll.polyfill();
    }
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
          <meta name="description" content="Local senior housing and senior care services for your loved ones. Find the best Senior Home by comparing pricing, availabilities, and amenities with Seniorly!" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
          <ScrollToTopRoute>
            <Switch>
              <Route
                path={`/:toc(${careTypes})/:state/:city/filters`}
                render={({ match }) => {
                      return <Redirect to={`/${match.params.toc}/${match.params.state}/${match.params.city}`} />;
                    }}
              />
              {this.routes.map(route => <Route key={route.path} {...route} />)}
              <Route render={routeProps => <Error {...routeProps} errorCode={404} />} />
            </Switch>
          </ScrollToTopRoute>
        </ThemeProvider>
      </Fragment>
    );
  }
}
