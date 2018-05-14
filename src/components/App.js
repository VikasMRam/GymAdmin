import React, { Component } from 'react';
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

setGlobalStyles();

export default class App extends Component {
  componentDidMount() {
    // this is not required when running in test env created by jsdom
    if (isBrowser) {
      smoothscroll.polyfill();
    }
  }

  render() {
    const careTypes = ['retirement-community', 'assisted-living', 'independent-living', 'alzheimers-care'].join('|');

    return (
      <React.Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <Helmet titleTemplate="%s | Seniorly">
          <title>Home</title>

          <meta name="description" content="The Senior Living Marketplace" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"
          />
          /*
            Open graph
           */
          <meta property="og:site_name" content="Seniorly" />
          <meta property="og:site_url" content="https://wwww.seniorly.com" />
          <meta property="og:type" content="website" />

          /*
            Twitter
           */
          <meta content="summary" property="twitter:card"/>
          <meta content="https://www.seniorly.com" property="twitter:site"/>
          <meta content="@seniorly" property="twitter:creator"/>

          <link rel="icon" href="/favicon.ico" />
        </Helmet>

        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path={`/:toc(${careTypes})/:state/:city/:communitySlug`}
              component={CommunityDetailPageContainer}
            />
            <Route
              path={`/:toc(${careTypes})/:state/:city`}
              component={CommunitySearchPageContainer}
            />
          </Switch>
        </ThemeProvider>

      </React.Fragment>
    );
  }
}
