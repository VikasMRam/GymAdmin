import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;

const AssessmentWizardPage = ({ location: { search } }) => {
  const qp = parseURLQueryParams(search);
  return (
    <>
      <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
      <StyledTemplateContent>
        <AssessmentWizard skipIntro={qp.skipIntro} />
      </StyledTemplateContent>
    </>
  );
};

AssessmentWizardPage.propTypes = {
  location: object,
};

export default AssessmentWizardPage;
