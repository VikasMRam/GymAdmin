import React, { Fragment } from 'react';
import { shape, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import AgentSummary from 'sly/components/molecules/AgentSummary/index';
import Section from 'sly/components/molecules/Section/index';
import { Hr } from 'sly/components/atoms';

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const StyledSection = styled(Section)`
  margin: 0 ${size('spacing.regular')};
`;

const AgentSummaryWrapper = styled.div`
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col8')};
  }
`;
const AgentProfilePage = ({ agent }) => {
  const { info } = agent;
  const { displayName, bio } = info;
  const firstName = displayName.split(' ')[0];
  return (
    <Fragment>
      <TemplateHeader><HeaderContainer /></TemplateHeader>
      <TemplateContent>
        <AgentSummaryWrapper>
          <AgentSummary {...info} firstName={firstName} bio={bio} />
        </AgentSummaryWrapper>
        <StyledHr />
        <StyledSection title={`About ${firstName}`}>
          {bio}
        </StyledSection>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

AgentProfilePage.propTypes = {
  agent: shape({
    info: object.isRequired,
  }).isRequired,
};

export default AgentProfilePage;
