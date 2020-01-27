import React from 'react';

import { Experiment, Variant } from 'sly/services/experiments';
import { community as communityPropType } from 'sly/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/components/organisms/GetCommunityPricingAndAvailability';
import GetHelpNowContainer from 'sly/containers/GetHelpNowContainer';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return (
    <Experiment name="Community_DetailPage_GDP" defaultVariant="Get_Pricing_And_Availability">
      <Variant name="Get_Help_Now">
        <AskAgentQuestionContainer type="side-column-get-help-now">
          {askAgent => <GetHelpNowContainer communitySlug={community.id} askAgent={askAgent} />}
        </AskAgentQuestionContainer>
      </Variant>
      <Variant name="Get_Pricing_And_Availability">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
    </Experiment>
  );
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
