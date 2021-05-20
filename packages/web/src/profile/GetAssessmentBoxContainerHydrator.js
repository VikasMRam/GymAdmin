import React from 'react';
import { useParams } from 'react-router-dom';

import { isBrowser } from 'sly/web/config';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
} from 'sly/web/constants/wizards/assessment';
import { PROFILE_CONTACTED } from 'sly/web/services/api/constants';
import communityPropType from 'sly/common/propTypes/community';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';
import { usePrefetch } from 'sly/web/services/api';
import { useHasPricingRequest } from 'sly/web/profile/hooks/useHasPricingRequest';

const GetAssessmentBoxContainerHydrator = (props) => {
  const params = useParams();

  const { requestInfo: { normalized: uuidActions } } = usePrefetch('getUuidActions', {
    'filter[actionType]': PROFILE_CONTACTED,
    'filter[actionInfo-slug]': params.communitySlug,
  });

  const hasAlreadyRequestedPricing = useHasPricingRequest(uuidActions);
  const completedAssessment = isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED);

  return (
    <GetAssessmentBoxContainer
      {...props}
      completedAssessment={completedAssessment}
      completedPricing={hasAlreadyRequestedPricing}
      agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
    />
  );
};

GetAssessmentBoxContainerHydrator.typeHydrationId = 'GetAssessmentBoxContainerHydrator';
GetAssessmentBoxContainerHydrator.propTypes = {
  community: communityPropType,
};

export default GetAssessmentBoxContainerHydrator;
