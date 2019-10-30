import React from 'react';
import { bool } from 'prop-types';
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
import GetCustomPricingContainer from 'sly/containers/GetCustomPricingContainer';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { getSearchParams } from 'sly/services/helpers/search';
import { withRouter } from 'react-router';

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

function GetCurrentAvailabilityContainer({
  community,
  hasAlreadyRequestedPricing,
  history,
  location,
  match,
}) {
  const { id } = community;
  const setQueryParams = getQueryParamsSetter(history, location);
  const queryParams = getSearchParams(match, location);

  return (
    <GetCustomPricingContainer
      community={community}
      hasAlreadyRequestedPricing={hasAlreadyRequestedPricing}
    >
      {getCustomPricing => (
        <ConciergeController
          communitySlug={id}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          gotoGetCustomPricing={getCustomPricing}
          history={history}
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
                submitExpressConversion={(e) => {
                  if (!hasAlreadyRequestedPricing) {
                    submitExpressConversion(e);
                  }
                  getCustomPricing();
                }}
                community={community}
              />
            );
          }}
        </ConciergeController>
      )}
    </GetCustomPricingContainer>
  );
}

GetCurrentAvailabilityContainer.propTypes = {
  community: communityPropType.isRequired,
  hasAlreadyRequestedPricing: bool,
};

export default withRouter(GetCurrentAvailabilityContainer);
