import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import { FonztestPage, PropertyListPage } from 'containers';
import PropertyDetailPage from './pages/PropertyDetailPage';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';
import { PrimaryNavigation } from 'components';

injectGlobal`
  body {
    margin: 0;
  }
`;

export default class App extends Component {
  render() {
    const careTypes = ['assisted-living', 'independent-living'].join('|');
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
            <Route path="/fonztest" component={FonztestPage} exact />
            <Route path="/proplist" component={PropertyListPage} exact />
            {/* <Route path="/community/:slug" component={PropertyDetailPage}  /> */}
            <Route
              path={`/:careType(${careTypes})/:state/:city/:slug`}
              component={PropertyDetailPage}
            />
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}
