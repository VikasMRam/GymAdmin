import React from 'react';
import { bool, func } from 'prop-types';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/services/helpers/events';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';
import { withRedirectTo } from 'sly/services/redirectTo';

function GetCustomPricingContainer({
  match: { params: { communitySlug } },
  hasAlreadyRequestedPricing,
  redirectTo,
  children,
  locTrack,
}) {
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
    redirectTo(`/custom-pricing/${communitySlug}`);
  };
  return children(onGotoCustomPricing);
}

GetCustomPricingContainer.propTypes = {
  hasAlreadyRequestedPricing: bool,
  redirectTo: func.isRequired,
  children: func.isRequired,
  locTrack: string.isRequired,
};

export default withRedirectTo(withRouter(GetCustomPricingContainer));
