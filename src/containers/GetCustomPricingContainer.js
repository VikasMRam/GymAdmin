import React from 'react';
import { bool, func, object } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function GetCustomPricingContainer({
  community,
  hasAlreadyRequestedPricing,
  children,
}) {
  const { id } = community;

  if(hasAlreadyRequestedPricing) {
    return (
      <AskAgentQuestionContainer type="pricing" community={community}>
        {(askAgentAboutPricing) => children(askAgentAboutPricing)}
      </AskAgentQuestionContainer>
    )
  } else {
    const onGotoCustomPricing = () => {
      SlyEvent.getInstance().sendEvent({
        action: 'click-gcp-button',
        category: 'PricingWizard',
        label: id,
      });
      history.push(`/custom-pricing/${id}`);
    };
    return children(onGotoCustomPricing);
  }
}
GetCustomPricingContainer.propTypes = {
  community: object.isRequired,
  hasAlreadyRequestedPricing: bool,
  children: func.isRequired,
};
