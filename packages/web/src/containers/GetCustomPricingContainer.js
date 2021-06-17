import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { bool, func, string } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';

function GetCustomPricingContainer({
  hasAlreadyRequestedPricing,
  children,
  locTrack,
}) {
  const { communitySlug } = useParams();

  const { push } = useHistory();

  if (hasAlreadyRequestedPricing) {
    return (
      <AskAgentQuestionContainer type="pricing">
        {askAgentAboutPricing => children(askAgentAboutPricing)}
      </AskAgentQuestionContainer>
    );
  }
  const onGotoCustomPricing = () => {
    SlyEvent.getInstance().sendEvent({
      action: `click-gcp-button-${locTrack}`,
      category: 'PricingWizard',
      label: communitySlug,
    });
    push(`/custom-pricing/${communitySlug}`);
  };
  return children(onGotoCustomPricing);
}

GetCustomPricingContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  children: func.isRequired,
  locTrack: string,
};

export default GetCustomPricingContainer;
