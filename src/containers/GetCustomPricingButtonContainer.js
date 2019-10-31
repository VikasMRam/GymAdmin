import React from 'react';
import { bool, object } from 'prop-types';

import GetCustomPricingContainer from 'sly/containers/GetCustomPricingContainer';
import Button from 'sly/components/atoms/Button';

export default function GetCustomPricingButtonContainer({
  community,
  hasAlreadyRequestedPricing,
  ...props
}) {
  return (
    <GetCustomPricingContainer
      community={community}
      hasAlreadyRequestedPricing={hasAlreadyRequestedPricing}
    >
      {getCustomPricing => <Button onClick={getCustomPricing} {...props} />}
    </GetCustomPricingContainer>
  );
}
GetCustomPricingButtonContainer.typeHydrationId = 'GetCustomPricingButtonContainer';
GetCustomPricingButtonContainer.propTypes = {
  community: object.isRequired,
  hasAlreadyRequestedPricing: bool,
};
