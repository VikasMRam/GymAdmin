import React from 'react';

import HowItWorksBannerNotificationContainer from 'sly/web/containers/HowItWorksBannerNotificationContainer';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';

export default function AskAgentQuestionHowItWorksBannerNotificationContainer(props) {
  return (
    <AskAgentQuestionContainer type="how-it-works-banner-notification">
      {askAgent => <HowItWorksBannerNotificationContainer {...props} askAgent={askAgent} />}
    </AskAgentQuestionContainer>
  );
}

AskAgentQuestionHowItWorksBannerNotificationContainer.typeHydrationId = 'AskAgentQuestionHowItWorksBannerNotificationContainer';
