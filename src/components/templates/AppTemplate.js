import React from 'react';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

import { hideChatbox } from 'sly/config';
import theme from 'sly/components/themes/default';
import { assetPath } from 'sly/components/themes';
import ChatBoxContainer from 'sly/containers/ChatBoxContainer';
import Router from 'sly/components/molecules/Router';
import GlobalStyles from 'sly/components/themes/GlobalStyles';

dayjs.extend(advancedFormat);
dayjs.extend(utc);

export default function AppTemplate({ children }) {
  return (
    <>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Helmet titleTemplate="%s | Seniorly">
        <title>Find The Best Senior Living Options Near You</title>
        <meta
          name="description"
          content="Local senior housing and senior care services for your loved ones. Find the best senior living home by comparing pricing, availability, and amenities with Seniorly!"
        />
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

        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={assetPath('favicon.ico')}
        />
      </Helmet>

      <ThemeProvider theme={theme}>
        {/*<GlobalStyles />*/}
        <Router>{children}</Router>
      </ThemeProvider>
      {!hideChatbox && <ChatBoxContainer />}
    </>
  );
}
