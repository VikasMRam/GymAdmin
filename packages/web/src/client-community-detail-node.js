import React from 'react';
import { Route } from 'react-router-dom';
import { object } from 'prop-types';

import { withHydration } from './services/partialHydration';

import AppTemplate from 'sly/web/components/templates/AppTemplate';
import Router from 'sly/web/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/web/containers/CommunityDetailPageContainer';
import UnhydratedRetentionPopup from 'sly/web/services/retentionPopup';
import { ApiContext } from 'sly/web/services/api/context';

const HydratedRetentionPopup = withHydration(UnhydratedRetentionPopup, { alwaysHydrate: true });

export default function ClientApp({ apiContext }) {
  apiContext.promises = [];
  apiContext.skipApiCalls = false;

  return (
    <ApiContext.Provider value={apiContext}>
      <AppTemplate>
        <Router>
          <Route
            path="/:toc/:state/:city/:communitySlug"
            exact
            render={routeProps => (
              <>
                <CommunityDetailPageContainer {...routeProps} />
                <HydratedRetentionPopup communityId={routeProps.match.params.communitySlug} />
              </>
              )
            }
          />
        </Router>
      </AppTemplate>
    </ApiContext.Provider>
  );
}

ClientApp.propTypes = {
  apiContext: object,
};
