import React from 'react';
import { bool , string } from 'prop-types';

import GetCustomPricingContainer from 'sly/containers/GetCustomPricingContainer';
import Button from 'sly/components/atoms/Button';

export default function GetCustomPricingButtonContainer({ hasAlreadyRequestedPricing, locTrack, ...props }) {
  return (
    <GetCustomPricingContainer hasAlreadyRequestedPricing={hasAlreadyRequestedPricing} locTrack={locTrack}>
      {getCustomPricing => <Button onClick={getCustomPricing} {...props} />}
    </GetCustomPricingContainer>
  );
}
GetCustomPricingButtonContainer.typeHydrationId = 'GetCustomPricingButtonContainer';
GetCustomPricingButtonContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  locTrack: string,
};