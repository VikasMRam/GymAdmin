import React from 'react';
import { bool, func, object } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';
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
GetCustomPricingContainer.propTypes = {
  community: object.isRequired,
  hasAlreadyRequestedPricing: bool,
};
