import React from 'react';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { startingWith } from 'sly/common/components/helpers';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';

const StyledTemplateContent = styled(TemplateContent)`
  // background-color: ${palette('harvest', 'background')};  
  // padding: ${size('spacing.xxxLarge')};
  // width: 100%;
> * {
    margin: auto;
  }

  // ${startingWith('laptop', css`
  //   > * {
  //     width: fit-content;
  //   }
  // `)}
`;

const AssessmentWizardPage = props => (
  <>
    <TemplateHeader noBottomMargin><HeaderContainer layout="wizard" /></TemplateHeader>
    <StyledTemplateContent>
      <AssessmentWizard {...props} />
    </StyledTemplateContent>
  </>
);

export default AssessmentWizardPage;
