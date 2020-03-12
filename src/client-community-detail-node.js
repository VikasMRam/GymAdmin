import React from 'react';
import { Route } from 'react-router-dom';

import { withHydration } from './services/partialHydration';

import AppTemplate from 'sly/components/templates/AppTemplate';
import Router from 'sly/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import UnhydratedRetentionPopup from 'sly/services/retentionPopup';

const HydratedRetentionPopup = withHydration(UnhydratedRetentionPopup, { alwaysHydrate: true });

export default function () {
  return (
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
  );
}
