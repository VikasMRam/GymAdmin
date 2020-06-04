import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssesmentWizard from 'sly/web/containers/wizards/assesment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;

const AssesmentWizardPage = ({ location: { search } }) => {
  const qp = parseURLQueryParams(search);
  return (
    <>
      <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
      <StyledTemplateContent>
        <AssesmentWizard skipIntro={qp.skipIntro} />
      </StyledTemplateContent>
    </>
  );
};

AssesmentWizardPage.propTypes = {
  location: object,
};

export default AssesmentWizardPage;
