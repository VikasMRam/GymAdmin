import React from 'react';
import { bool } from 'prop-types';

import GetCustomPricingContainer from 'sly/containers/GetCustomPricingContainer';
import Button from 'sly/components/atoms/Button';

export default function GetCustomPricingButtonContainer({ hasAlreadyRequestedPricing, ...props }) {
  return (
    <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing}>
      {getCustomPricing => <Button onClick={getCustomPricing} {...props} />}
    </GetCustomPricingContainer>
  );
}
GetCustomPricingButtonContainer.typeHydrationId = 'GetCustomPricingButtonContainer';
GetCustomPricingButtonContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
};
