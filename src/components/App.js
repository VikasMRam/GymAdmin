import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import smoothscroll from 'smoothscroll-polyfill';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

import { isBrowser } from 'sly/config';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import CommunitySearchPageContainer from 'sly/containers/CommunitySearchPageContainer';
import HomePage from 'sly/components/pages/HomePage';

setGlobalStyles();

const careTypes = ['retirement-community', 'assisted-living', 'independent-living', 'alzheimers-care'].join('|');

export const routes = [
  { 
    path: '/community/:communitySlug', 
    component: CommunityDetailPageContainer,
  },
  {
    path: `/:toc(${careTypes})/:state/:city`,
    component: CommunitySearchPageContainer,
  },
  { 
    path: '/',
    component: HomePage,
    exact: true,
  }
];

export default class App extends Component {
  componentDidMount() {
    // this is not required when running in test env created by jsdom
    if (isBrowser) {
      smoothscroll.polyfill();
    }
  }

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Helmet titleTemplate="Seniorly - %s">
          <title>Home</title>
          <meta name="description" content="The Senior Living Marketplace" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:site_name" content="ARc" />
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>

        <ThemeProvider theme={theme}>
          <Switch>
            {routes.map(route => <Route key={route.path} {...route} />)}
          </Switch>
        </ThemeProvider>
      </Fragment>
    );
  }
}
