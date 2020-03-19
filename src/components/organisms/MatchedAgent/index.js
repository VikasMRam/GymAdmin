import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { size, assetPath, palette } from 'sly/components/themes';
import agentPropType from 'sly/propTypes/agent';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import textAlign from 'sly/components/helpers/textAlign';
import { Heading, Box, Avatar, Block, Link, Image } from 'sly/components/atoms';
import AdTile from 'sly/components/organisms/AdTile';

const StyledImage = styled(Image)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

const AgentInfoWrapper = pad(styled.div``);

const ShadowBox = shadow(textAlign(Box));

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const AgentPlaceholder = pad(styled.div`
  background: ${palette('grey', 'filler')};
  border: ${size('border.regular')} solid ${palette('grey', 'base')};
  width: calc(${size('element.small')} + ${size('element.regular')});
  height: calc(${size('element.small')} + ${size('element.regular')});
`);
AgentPlaceholder.displayName = 'AgentPlaceholder';

const Wrapper = styled.div`
  padding: ${size('spacing.xxxLarge')};
  padding-top: calc(${size('spacing.massive')} + ${size('spacing.huge')} - ${size('spacing.small')});
  padding-bottom: calc(${size('spacing.massive')} * 2  + ${size('spacing.xxxLarge')});
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MatchedAgent = ({ heading, agent, onLearnMoreClick }) => (
  <ShadowBox>
    {agent &&
      <>
        <PaddedHeading size="subtitle" weight="medium">{heading}</PaddedHeading>
        <AgentInfoWrapper>
          <Avatar size="xxLarge" user={{ name: agent.name, picture: agent.info.profileImageUrl }} />
          <Block weight="medium">{agent.name}</Block>
          <Block>Local Senior Living Expert</Block>
          <Link to={`mailto:${agent.info.email}`}>{agent.info.email}</Link><br />
          <Link to={`tel:${agent.info.workPhone}`}>{agent.info.workPhone}</Link>
        </AgentInfoWrapper>
        <AdTile
          title="Selling a home to pay the cost of senior living? "
          layout="row"
          imagePosition="right"
          buttonText="Learn more about selling my home"
          image={assetPath('vectors/house-sold.svg')}
          buttonProps={{ onClick: onLearnMoreClick }}
        >
          Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
        </AdTile>
      </>
    }
    {!agent &&
      <Wrapper>
        <AgentPlaceholder />
        <Block weight="medium" size="subtitle">hold on we are matching you with a local senior living expert</Block>
      </Wrapper>
    }
  </ShadowBox>
);

MatchedAgent.propTypes = {
  heading: string,
  agent: agentPropType,
  onLearnMoreClick: func,
};

export default MatchedAgent;
