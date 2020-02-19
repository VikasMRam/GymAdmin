import React from 'react';

import SlyEvent from 'sly/services/helpers/events';
import AskAgentAdTile from 'sly/components/organisms/AskAgentAdTile';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function AskAgentAdTileContainer() {
  const handleAskExpertQuestionClick = (askAgentAboutPricing) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-gcp-button',
      category: 'PricingWizard',
      label: communitySlug,
    });
    askAgentAboutPricing();
  };

  return (
    <AskAgentQuestionContainer type="pricing">
      {askAgentAboutPricing => <AskAgentAdTile title="test" onAskExpertQuestionClick={() => handleAskExpertQuestionClick(askAgentAboutPricing)} />}
    </AskAgentQuestionContainer>
  );
}
