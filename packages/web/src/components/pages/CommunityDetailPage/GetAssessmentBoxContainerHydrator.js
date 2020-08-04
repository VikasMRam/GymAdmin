import React, { Component } from 'react';

import { isBrowser } from 'sly/web/config';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
  ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES,
} from 'sly/web/constants/wizards/assessment';
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
    const completedAssessment = isBrowser &&
      (community ? !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES)?.includes(community.id) :
        !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED));

    return (
      <GetAssessmentBoxContainer
        {...this.props}
        completedAssessment={completedAssessment}
        agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
      />
    );
  }
}
