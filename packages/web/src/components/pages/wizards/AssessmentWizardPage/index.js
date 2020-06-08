import React from 'react';
import styled from 'styled-components';
import { bool } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import AssessmentWizard from 'sly/web/containers/wizards/assessment';

const StyledTemplateContent = styled(TemplateContent)`
  > * {
    margin: auto;
    width: fit-content;
  }
`;


const AssessmentWizardPage = ({ skipIntro, community }) => (
  <>
    <TemplateHeader><HeaderContainer layout="wizards" /></TemplateHeader>
    <StyledTemplateContent>
      <AssessmentWizard skipIntro={skipIntro} community={community} />
    </StyledTemplateContent>
  </>
);

AssessmentWizardPage.propTypes = {
  skipIntro: bool,
  community: communityPropType,
};

export default AssessmentWizardPage;
