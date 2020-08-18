import React from 'react';
import styled from 'styled-components';

import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';
// import AssessmentWizardV1_1 from 'sly/web/containers/wizards/assessment_v1_1';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;

const AssessmentWizardPage = props => {
  // const { version } = props;
  // let AssessmentWizard = AssessmentWizardV1_1;
  // if (version === '2') {
  //
  //   AssessmentWizard = AssessmentWizardv2;
  // }
  return (
    <>
      <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
      <StyledTemplateContent>
        <AssessmentWizard {...props} />
      </StyledTemplateContent>
    </>
  );
};

export default AssessmentWizardPage;
