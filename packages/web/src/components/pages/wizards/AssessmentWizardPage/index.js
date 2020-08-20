import React from 'react';
import styled from 'styled-components';

import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
  }
`;

const AssessmentWizardPage = props => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <StyledTemplateContent>
      <AssessmentWizard {...props} />
    </StyledTemplateContent>
  </>
);

export default AssessmentWizardPage;
