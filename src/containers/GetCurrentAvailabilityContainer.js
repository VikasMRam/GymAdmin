import React from 'react';
import { bool, object } from 'prop-types';
import { withRouter } from 'react-router';

import { community as communityPropType } from 'sly/propTypes/community';
import {
  createBooleanValidator,
  email,
  required,
  usPhone,
} from 'sly/services/validation';
import ConciergeController from 'sly/controllers/ConciergeController';
import GetAvailabilitySuccessBox from 'sly/components/molecules/GetAvailabilitySuccessBox';
import GetCurrentAvailabilityFormContainer from 'sly/containers/GetCurrentAvailabilityFormContainer';
import { prefetch } from 'sly/services/newApi';

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

function GetCurrentAvailabilityContainer({
  community,
}) {
  const { id } = community;

  return (
    <ConciergeController
      communitySlug={id}
    >
      {({ concierge, submitExpressConversion, userDetails }) => {
        if (concierge.contactRequested) {
          return (
            <GetAvailabilitySuccessBox
              hasAllUserData={hasAllUserData(userDetails)}
            />
          );
        }
        return (
          <GetCurrentAvailabilityFormContainer
            submitExpressConversion={submitExpressConversion}
            community={community}
          />
        );
      }}
    </ConciergeController>
  );
}
GetCurrentAvailabilityContainer.typeHydrationId = 'GetCurrentAvailabilityContainer';
GetCurrentAvailabilityContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  community: communityPropType,
  history: object,
  match: object,
  location: object,
};

const withCommunity = prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}));

export default withRouter(withCommunity(GetCurrentAvailabilityContainer));
