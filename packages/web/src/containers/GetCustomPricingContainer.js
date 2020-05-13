import React from 'react';
import { bool, func, string } from 'prop-types';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/web/services/helpers/events';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';
import { withRedirectTo } from 'sly/web/services/redirectTo';

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
  locTrack: string,
};

export default withRedirectTo(withRouter(GetCustomPricingContainer));
