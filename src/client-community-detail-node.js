import React from 'react';
import { Route } from 'react-router';
import { object } from 'prop-types';

import { withHydration } from './services/partialHydration/index';

import AppTemplate from 'sly/components/templates/AppTemplate';
import Router from 'sly/components/molecules/Router';
import CommunityDetailPageContainer from 'sly/containers/CommunityDetailPageContainer';
import UnhydratedRetentionPopup from 'sly/services/retentionPopup';

const HydratedRetentionPopup = withHydration(UnhydratedRetentionPopup, { alwaysHydrate: true });


function ClientCommunityDetailNode() {
  return (
    <AppTemplate>
      <Router>
        <Route
          path="/:toc/:state/:city/:communitySlug"
          exact
          render={props => (
            <>
              <CommunityDetailPageContainer {...props} />
              <HydratedRetentionPopup communityId={props.match.params.communitySlug} />
            </>)
          }
        />
      </Router>
    </AppTemplate>
  );
}


ClientCommunityDetailNode.propTypes = {
  match: object,
};

export default ClientCommunityDetailNode;
