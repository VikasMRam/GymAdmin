import React from 'react';
import { Route } from 'react-router-dom';
import { object } from 'prop-types';

import AppTemplate from 'sly/web/components/templates/AppTemplate';
import Router from 'sly/web/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/web/containers/CommunityDetailPageContainer';
import { ApiProvider } from 'sly/web/services/api';

export default function ClientApp({ apiContext }) {
  return (
    <ApiProvider value={apiContext}>
      <AppTemplate>
        <Router>
          <Route
            path="/:toc/:state/:city/:communitySlug"
            exact
            render={routeProps => <CommunityDetailPageContainer {...routeProps} />}
          />
        </Router>
      </AppTemplate>
    </ApiProvider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
};
