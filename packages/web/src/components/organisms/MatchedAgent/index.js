import React from 'react';
import styled, { keyframes } from 'styled-components';
import { string, node } from 'prop-types';

import { size, palette } from 'sly/web/components/themes';
import agentPropType from 'sly/web/propTypes/agent';
import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Box, Block, Link, Button } from 'sly/web/components/atoms';
import Avatar from 'sly/web/components/molecules/Avatar';
import IconItem from 'sly/web/components/molecules/IconItem';

const AgentInfoWrapper = pad(styled.div``);

const PaddedAvatar = pad(Avatar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const LargePaddedBlock = pad(Block, 'large');

const TextAlignCenterBlock = textAlign(Block);

const FullWidthButton = fullWidth(Button);

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AgentPlaceholder = pad(styled.div`
  display: inline-block;
  position: relative;
  width: calc(${size('element.small')} + ${size('element.regular')});
  height: calc(${size('element.small')} + ${size('element.regular')});
  div {
    animation: ${loading} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${palette('primary', 'base')};
    margin: -4px 0 0 -4px;
  }
  div:nth-child(1) {
    animation-delay: -0.036s;
  }
  div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  div:nth-child(2) {
    animation-delay: -0.072s;
  }
   div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
   div:nth-child(3) {
    animation-delay: -0.108s;
  }
   div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
   div:nth-child(4) {
    animation-delay: -0.144s;
  }
   div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
   div:nth-child(5) {
    animation-delay: -0.18s;
  }
   div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
   div:nth-child(6) {
    animation-delay: -0.216s;
  }
   div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
   div:nth-child(7) {
    animation-delay: -0.252s;
  }
   div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
   div:nth-child(8) {
    animation-delay: -0.288s;
  }
  div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
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

const MatchedAgent = ({ heading, agent, children, prevLink }) => (
  <Box>
    {agent &&
      <>
        <TextAlignCenterBlock>
          <PaddedAvatar size="xxLarge" user={{ name: agent.name, picture: { src: agent.info.profileImageUrl } }} />
        </TextAlignCenterBlock>
        <PaddedHeading size="subtitle" weight="medium">{heading}</PaddedHeading>
        <LargePaddedBlock>Questions? You can contact {agent.name.split(' ')[0]} by phone or email:</LargePaddedBlock>
        <AgentInfoWrapper>
          <IconItem icon="email" iconPalette="slate"><Link to={`mailto:${agent.info.email}`}>{agent.info.email}</Link></IconItem>
          <IconItem icon="phone" iconPalette="slate"><Link to={`tel:${agent.info.workPhone}`}>{agent.info.workPhone}</Link></IconItem>
        </AgentInfoWrapper>
        <FullWidthButton to={prevLink}>Return to Profile</FullWidthButton>
        {children}
      </>
    }
    {!agent &&
      <Wrapper>
        <AgentPlaceholder><div/><div/><div/><div/><div/><div/><div/><div/></AgentPlaceholder>
        <TextAlignCenterBlock weight="medium" size="subtitle">Hold on, we are matching you with a local senior living expert...</TextAlignCenterBlock>
      </Wrapper>
    }
  </Box>
);

MatchedAgent.propTypes = {
  heading: string,
  agent: agentPropType,
  children: node,
  prevLink: string,
};

export default MatchedAgent;
