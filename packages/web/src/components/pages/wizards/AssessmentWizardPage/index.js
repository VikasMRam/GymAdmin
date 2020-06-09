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

const AssesmentWizardPage = props => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <StyledTemplateContent>
      <AssesmentWizard {...props} />
    </StyledTemplateContent>
  </>
);

export default AssesmentWizardPage;
