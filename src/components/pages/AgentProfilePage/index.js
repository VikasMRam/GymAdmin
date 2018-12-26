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
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import EntityReviews from 'sly/components/organisms/EntityReviews/index';

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const StyledSection = styled(Section)`
  margin: 0 ${size('spacing.regular')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0 ${size('spacing.xxxLarge')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin: 0;
  }
`;

const AgentSummaryWrapper = styled.div`
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col10')};
  }
`;

const AskQuestionToAgentWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: ${size('spacing.huge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col6')};
  }
`;

const AgentProfilePage = ({ agent, user }) => {
  if (!agent) {
    return null;
  }
  console.log(agent);
  const { info, reviews } = agent;
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
        <StyledSection title={`${firstName}'s reviews`} >
          <EntityReviews
            // reviewsValue={reviewsValue}
            reviews={reviews}
            user={user}
          />
        </StyledSection>
        <StyledSection title={`About ${firstName}`}>
          {bio}
        </StyledSection>
        <StyledHr />
        <StyledSection>
          <AskQuestionToAgentWrapper>
            <AskQuestionToAgentFormContainer heading={`Ask ${firstName} a question`} firstName={firstName} />
          </AskQuestionToAgentWrapper>
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
  user: object,
};

export default AgentProfilePage;
