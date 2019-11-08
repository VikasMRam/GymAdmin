import React from 'react';
import { withRouter } from 'react-router';

import Concierge from 'sly/components/organisms/Concierge';
import ConciergeController from 'sly/controllers/ConciergeController';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { getSearchParams } from 'sly/services/helpers/search';

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

export default withRouter(ConciergeContainer);
