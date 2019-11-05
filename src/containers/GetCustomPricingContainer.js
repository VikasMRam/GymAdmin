import React from 'react';
import { bool, func, object } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';
import {withRedirectTo} from "sly/services/redirectTo";

function GetCustomPricingContainer({
  community,
  hasAlreadyRequestedPricing,
  redirectTo,
  children,
}) {
  const { id } = community;

  if (hasAlreadyRequestedPricing) {
    return (
      <AskAgentQuestionContainer type="pricing" community={community}>
        {askAgentAboutPricing => children(askAgentAboutPricing)}
      </AskAgentQuestionContainer>
    );
  }
  const onGotoCustomPricing = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-gcp-button',
      category: 'PricingWizard',
      label: id,
    });
    redirectTo(`/custom-pricing/${id}`);
  };
  return children(onGotoCustomPricing);
}

GetCustomPricingContainer.propTypes = {
  community: object.isRequired,
  hasAlreadyRequestedPricing: bool,
  redirectTo: func.isRequired,
  children: func.isRequired,
};

export default withRedirectTo(GetCustomPricingContainer);
