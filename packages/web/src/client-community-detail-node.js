import React from 'react';
import { Route } from 'react-router-dom';

import { withHydration } from './services/partialHydration';

import AppTemplate from 'sly/web/components/templates/AppTemplate';
import Router from 'sly/web/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/web/containers/CommunityDetailPageContainer';
import UnhydratedRetentionPopup from 'sly/web/services/retentionPopup';

const HydratedRetentionPopup = withHydration(UnhydratedRetentionPopup, { alwaysHydrate: true });

export renderToString from 'sly/web/services/api/renderToString';

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
