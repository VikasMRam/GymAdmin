import React from 'react';
import { string } from 'prop-types';

import AssessmentWizardV1 from 'sly/web/containers/wizards/assessment/v1';
import AssessmentWizardV11 from 'sly/web/containers/wizards/assessment/v1_1';

const AssessmentWizard = ({ version, ...props }) => {
  let WizardComponent = AssessmentWizardV1;
  if (version === 'v1_1') {
    WizardComponent = AssessmentWizardV11;
  }
  return <WizardComponent {...props} />;
};

AssessmentWizard.propTypes = {
  version: string,
};

export default AssessmentWizard;
