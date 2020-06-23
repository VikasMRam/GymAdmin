import React, { Component } from 'react';

import { isBrowser } from 'sly/web/config';
import { ASSESSMENT_WIZARD_MATCHED_AGENT, ASSESSMENT_WIZARD_COMPLETED } from 'sly/web/constants/wizards/assessment';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';

export default class GetAssessmentBoxContainerHydrator extends Component {
  static typeHydrationId = 'GetAssessmentBoxContainerHydrator';

  render() {
    if (!isBrowser) {
      return null;
    }

    return (
      <GetAssessmentBoxContainer
        {...this.props}
        completedAssessment={isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED)}
        agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
      />
    );
  }
}
