import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { getSearchParams } from 'sly/services/helpers/search';
import { prefetch } from 'sly/services/newApi';

function ConciergeContainer({
  community,
  pathName,
  history,
  location,
  match,
  ...props
}) {
  const setQueryParams = getQueryParamsSetter(history, location);
  const queryParams = getSearchParams(match, location);
  const communitySlug = community ? community.id : undefined;

  return (
    <ConciergeController
      history={history}
      pathName={pathName}
      communitySlug={communitySlug}
      queryParams={queryParams}
      setQueryParams={setQueryParams}
    >
      {({
        concierge,
        submitExpressConversion,
        submitRegularConversion,
        gotoWhatNext,
        submitAdvancedInfo,
        close,
      }) => (
        <Concierge
          concierge={concierge}
          community={community}
          gotoWhatNext={gotoWhatNext}
          submitExpressConversion={submitExpressConversion}
          submitRegularConversion={submitRegularConversion}
          submitAdvancedInfo={submitAdvancedInfo}
          close={close}
          {...props}
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
