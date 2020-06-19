import React from 'react';

import { Experiment, Variant } from 'sly/web/services/experiments';
import { community as communityPropType } from 'sly/web/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return (
    <Experiment name="MainProfileCTA">
      <Variant name="PricingWizard1">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
      <Variant name="PricingWizard2">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
      <Variant name="PricingWizard3">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
      <Variant name="PricingWizard4">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
      <Variant name="AssessmentWizard">
        <GetAssessmentBoxContainer community={community} layout="sidebar" />
      </Variant>

    </Experiment>
  );
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
