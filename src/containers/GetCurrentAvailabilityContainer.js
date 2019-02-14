import React from 'react';
import { object, func } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { createBooleanValidator, email, required, usPhone } from 'sly/services/validation';
import ConciergeController from 'sly/controllers/ConciergeController';
import GetAvailabilitySuccessBox from 'sly/components/molecules/GetAvailabilitySuccessBox';
import GetCurrentAvailabilityFormContainer from 'sly/containers/GetCurrentAvailabilityFormContainer';

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const GetCurrentAvailabilityContainer = ({
  community, queryParams, setQueryParams, onGotoGetCustomPricing, onSubmitExpressConversion, history,
}) => {
  const { id } = community;

  return (
    <ConciergeController
      communitySlug={id}
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      gotoGetCustomPricing={onGotoGetCustomPricing}
      history={history}
    >
      {({ concierge, submitExpressConversion, userDetails }) => {
          if (concierge.contactRequested) {
            return <GetAvailabilitySuccessBox hasAllUserData={hasAllUserData(userDetails)} />;
          }
          return (
            <GetCurrentAvailabilityFormContainer
              submitExpressConversion={e => onSubmitExpressConversion(e, submitExpressConversion)}
              community={community}
            />
          );
        }
      }
    </ConciergeController>
  );
};

GetCurrentAvailabilityContainer.propTypes = {
  community: communityPropType,
  queryParams: object,
  setQueryParams: func,
  onGotoGetCustomPricing: func,
  onSubmitExpressConversion: func,
  history: object,
};

export default GetCurrentAvailabilityContainer;
