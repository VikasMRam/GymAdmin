import React from 'react';
import { string } from 'prop-types';

import AssessmentWizardV11a from 'sly/web/containers/wizards/assessment/v1_1a';
import AssessmentWizardV1 from 'sly/web/containers/wizards/assessment/v1';
import AssessmentWizardV11 from 'sly/web/containers/wizards/assessment/v1_1';

const AssessmentWizard = ({ version, ...props }) => {
  let WizardComponent = AssessmentWizardV11;
  if (version === 'v1') {
    WizardComponent = AssessmentWizardV1;
  }
  if (version === 'v1a') {
    WizardComponent = AssessmentWizardV11a;
  }
  return <WizardComponent {...props} />;
};

AssessmentWizard.propTypes = {
  version: string,
};

export default AssessmentWizard;
