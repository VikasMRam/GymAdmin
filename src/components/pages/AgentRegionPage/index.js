import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, arrayOf } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import { size, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import AgentTile from 'sly/components/molecules/AgentTile';
import Section from 'sly/components/molecules/Section';
import Footer from 'sly/components/organisms/Footer';
import { Block, Link, Hr } from 'sly/components/atoms';
import TalkToAgentFormContainer from 'sly/containers/TalkToAgentFormContainer';
import FindLocalAgent from 'sly/components/organisms/FindLocalAgent';
import MostSearchedRegions from 'sly/components/molecules/MostSearchedRegions';
import { mostSearchedRegions } from 'sly/services/helpers/agents';

const PageHeadingSection = styled.div`
  text-align: center;
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tabletLayout.col6')};
  }
`;

const FindLocalAgentLink = styled(Link)`
  text-decoration: underline;
`;

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

const AgentTilesWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: ${size('layout.col4')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

const FormSection = styled.div`
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col6')};
  }
`;

const FindLocalAgentWrapper = styled.div`
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  padding: ${size('spacing.xxxLarge')} ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.huge')};
`;

const StyledSection = styled(Section)`
  margin-bottom: ${size('spacing.huge')};
`;

const NoResultBlock = styled(Block)`
  text-align: center;
`;

const AgentProfilePage = ({ title, locationName, agentsList }) => {
  if (!agentsList) {
    return null;
  }
  return (
    <Fragment>
      <TemplateHeader><HeaderContainer /></TemplateHeader>
      <TemplateContent>
        <PageHeadingSection>
          <Block size="hero">{title}</Block>
          <FindLocalAgentLink to="/" palette="slate">Looking for agents in other areas?</FindLocalAgentLink>
        </PageHeadingSection>
        <StyledHr />
        {agentsList.length > 0 &&
          <AgentTilesWrapper>
            {agentsList.map(agent => <Link key={agent.id} to="/"><AgentTile agent={agent} /></Link>)}
          </AgentTilesWrapper>
        }
        {agentsList.length === 0 &&
          <NoResultBlock>{`It looks like we do not have any agents listed in ${locationName}. We are currently adding new partners everyday who might not be listed yet. Fill out the form below and we will help you find your local partner agent.`}</NoResultBlock>
        }
        <StyledHr />
        <FormSection>
          <TalkToAgentFormContainer headingSize="title" onSubmit={() => {}} />
        </FormSection>
        <StyledHr />
        <FindLocalAgentWrapper>
          <FindLocalAgent onLocationSearch={() => {}} />
        </FindLocalAgentWrapper>
        <StyledSection centerTitle title="Search senior living agents by region">
          <MostSearchedRegions mostSearchedRegions={mostSearchedRegions} />
        </StyledSection>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

AgentProfilePage.propTypes = {
  title: string.isRequired,
  locationName: string.isRequired,
  agentsList: arrayOf(agentPropType),
};

export default AgentProfilePage;
