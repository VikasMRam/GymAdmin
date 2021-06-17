import React from 'react';
import styled, { css } from 'styled-components';

import { Link } from 'sly/common/system';
import Logo from 'sly/common/components/atoms/Logo';
import { size, palette } from 'sly/common/components/themes';
import { startingWith } from 'sly/common/components/helpers';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import AssessmentWizard from 'sly/web/assessment/AssessmentWizard';

const StyledTemplateContent = styled(TemplateContent)`
  background-color: ${palette('harvest', 'background')};
  padding: 0;
  width: 100% !important;
  min-height: calc(100vh - 80px);
  > * {
    margin: auto;
  }

  ${startingWith('desktop', css`
    > * {
      max-width: ${size('breakpoint.desktop')};
      margin: auto;
    }
  `)}


`;

const AssessmentWizardPage = props => (
  <>
    <TemplateHeader noBottomMargin>
      <Link
        to="/"
        sx={{
          height: 'xxxl',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: 's',
          borderColor: 'slate.lighter-90',
        }}
      >
        <Logo />
      </Link>
    </TemplateHeader>
    <StyledTemplateContent>
      <AssessmentWizard {...props} />
    </StyledTemplateContent>
  </>
);

export default AssessmentWizardPage;
