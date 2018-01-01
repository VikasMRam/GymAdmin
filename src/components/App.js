import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';

import { HomePage, FonztestPage } from 'components';

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default';

injectGlobal`
  body {
    margin: 0;
  }
`;

export default class App extends Component {
  render() { 
    return (
      <div>
        <Helmet titleTemplate="ARc - %s">
          <title>Atomic React</title>
          <meta name="description" content="React starter kit based on Atomic Design with React Router v4, Webpack, Redux, Server Side Rendering and more." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:site_name" content="ARc" />
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/fonztest" component={FonztestPage} exact />
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}

