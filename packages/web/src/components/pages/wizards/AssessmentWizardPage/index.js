import React from 'react';
import styled, { css } from 'styled-components';

import { startingWith } from 'sly/common/components/helpers';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
  }

  ${startingWith('laptop', css`
    > * {
      width: fit-content;
    }
  `)}
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
