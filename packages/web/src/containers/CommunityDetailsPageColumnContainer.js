import React from 'react';

import { Experiment, Variant } from 'sly/web/services/experiments';
import { community as communityPropType } from 'sly/web/propTypes/community';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return (
    <Experiment name="MainProfileCTA">
      <Variant name="PricingWizard">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
      </Variant>
      <Variant name="AssessmentWizard">
        <GetCommunityPricingAndAvailability community={community} buttonTo={`/wizards/assessment/community/${community.id}`} />
      </Variant>

    </Experiment>
  );
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
