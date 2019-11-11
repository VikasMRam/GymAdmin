import React from 'react';
import { Route } from 'react-router';

import { withHydration } from './services/partialHydration/index';

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
          component={CommunityDetailPageContainer}
          exact
        />
        <HydratedRetentionPopup />
      </Router>
    </AppTemplate>
  );
}
