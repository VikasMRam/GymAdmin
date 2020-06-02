import React from 'react';
import styled from 'styled-components';

import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssesmentWizard from 'sly/web/containers/wizards/assesment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;

const AssesmentWizardPage = () => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <StyledTemplateContent>
      <AssesmentWizard />
    </StyledTemplateContent>
  </>
);

export default AssesmentWizardPage;
