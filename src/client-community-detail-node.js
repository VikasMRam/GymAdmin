import React from 'react';
import { Route } from 'react-router';

import AppTemplate from 'sly/components/templates/AppTemplate';
import Router from 'sly/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';

export default function () {
  return (
    <AppTemplate>
      <Router>
        <Route
          path="/:toc/:state/:city/:communitySlug"
          component={CommunityDetailPageContainer}
          exact
        />
      </Router>
    </AppTemplate>
  );
}
