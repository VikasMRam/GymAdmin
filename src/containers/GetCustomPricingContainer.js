import React from 'react';
import { bool, func, object } from 'prop-types';
import { withRouter } from 'react-router';
import SlyEvent from 'sly/services/helpers/events';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

function GetCustomPricingContainer({
  community,
  hasAlreadyRequestedPricing,
  history,
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
    history.push(`/custom-pricing/${id}`);
  };
  return children(onGotoCustomPricing);
}

GetCustomPricingContainer.propTypes = {
  community: object.isRequired,
  hasAlreadyRequestedPricing: bool,
  history: object.isRequired,
  children: func.isRequired,
};

export default withRouter(GetCustomPricingContainer);
