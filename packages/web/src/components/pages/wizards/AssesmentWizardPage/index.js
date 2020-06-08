import React from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssesmentWizard from 'sly/web/containers/wizards/assesment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;

const AssesmentWizardPage = ({ skipIntro, community }) => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <StyledTemplateContent>
      <AssesmentWizard skipIntro={skipIntro} community={community} />
    </StyledTemplateContent>
  </>
);

AssesmentWizardPage.propTypes = {
  skipIntro: bool,
  community: communityPropType,
};

export default AssesmentWizardPage;
