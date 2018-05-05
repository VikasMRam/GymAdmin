import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import CommunitySearchPageContainer from 'sly/containers/CommunitySearchPageContainer';
// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import setGlobalStyles from './themes/setGlobalStyles';

setGlobalStyles();

export default class App extends Component {
  render() {
    const careTypes = ['retirement-community','assisted-living', 'independent-living','alzheimers-care'].join('|');
    return (
      <div>
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
            <Route path="/community/:communitySlug" component={CommunityDetailPageContainer}  />
            <Route
              path={`/:toc(${careTypes})/:state/:city`}
              component={CommunitySearchPageContainer}
            />
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}
