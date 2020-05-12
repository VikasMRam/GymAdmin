import React from 'react';

import { Experiment, Variant } from 'sly/web/services/experiments';
import { community as communityPropType } from 'sly/web/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import GetHelpNowContainer from 'sly/web/containers/GetHelpNowContainer';
import AskAgentQuestionContainer from 'sly/web/containers/AskAgentQuestionContainer';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return (
    <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
  );
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
