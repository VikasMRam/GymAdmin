import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';
import { prefetch } from 'sly/services/api';

function ConciergeContainer({
  community,
}) {
  const communitySlug = community ? community.id : undefined;

  return (
    <ConciergeController
      communitySlug={communitySlug}
    >
      {({
        concierge,
        submitRegularConversion,
      }) => (
        <Concierge
          concierge={concierge}
          community={community}
          submitRegularConversion={submitRegularConversion}
        />
      )}
    </ConciergeController>
  );
}
ConciergeContainer.typeHydrationId = 'ConciergeContainer';
ConciergeContainer.propTypes = {
  community: object.isRequired,
};

const withCommunity = prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}));

export default withRouter(withCommunity(ConciergeContainer));
