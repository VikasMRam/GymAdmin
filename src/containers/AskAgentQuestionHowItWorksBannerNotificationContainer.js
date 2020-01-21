import React from 'react';

import HowItWorksBannerNotificationContainer from 'sly/containers/HowItWorksBannerNotificationContainer';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function AskAgentQuestionHowItWorksBannerNotificationContainer(props) {
  return (
    <AskAgentQuestionContainer type="how-it-works">
      {askAgent => <HowItWorksBannerNotificationContainer {...props} askAgent={askAgent} />}
    </AskAgentQuestionContainer>
  );
}

AskAgentQuestionHowItWorksBannerNotificationContainer.typeHydrationId = 'AskAgentQuestionButtonContainer';
