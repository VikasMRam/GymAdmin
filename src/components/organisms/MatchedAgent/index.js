import React from 'react';
import styled from 'styled-components';
import { string, node } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import agentPropType from 'sly/propTypes/agent';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import textAlign from 'sly/components/helpers/textAlign';
import { Heading, Box, Avatar, Block, Link } from 'sly/components/atoms';

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

const MatchedAgent = ({ heading, agent, children }) => (
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
        {children}
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
  children: node,
};

export default MatchedAgent;
