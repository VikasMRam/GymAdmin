import React, { Component } from 'react';

import { isBrowser } from 'sly/web/config';
import { isCtaRecorded } from 'sly/web/services/helpers/localStorage';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
  ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES,
} from 'sly/web/constants/wizards/assessment';
import { PRICING_REQUEST } from 'sly/web/services/api/constants';
import communityPropType from 'sly/common/propTypes/community';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';

export default class GetAssessmentBoxContainerHydrator extends Component {
  static typeHydrationId = 'GetAssessmentBoxContainerHydrator';

  static propTypes = {
    community: communityPropType,
  };

  render() {
    if (!isBrowser) {
      // return null;
    }
    const { community } = this.props;
    const completedAssessment = isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED);
    const completedPricing = isBrowser && (community ? isCtaRecorded(PRICING_REQUEST, community.id)  : false);

    return (
      <GetAssessmentBoxContainer
        {...this.props}
        completedAssessment={completedAssessment}
        completedPricing={completedPricing}
        agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
      />
    );
  }
}
