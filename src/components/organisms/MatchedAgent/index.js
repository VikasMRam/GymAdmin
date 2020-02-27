import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size, assetPath } from 'sly/components/themes';
import agentPropType from 'sly/propTypes/agent';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import textAlign from 'sly/components/helpers/textAlign';
import { Heading, Box, Avatar, Block, Link, Image } from 'sly/components/atoms';
import SearchResultsAdTile from 'sly/components/organisms/SearchResultsAdTile';

const StyledImage = styled(Image)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

const AgentInfoWrapper = pad(styled.div``);

const ShadowBox = shadow(textAlign(Box));

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const MatchedAgent = ({ heading, agent }) => (
  <ShadowBox>
    <PaddedHeading size="subtitle" weight="medium">{heading}</PaddedHeading>
    <AgentInfoWrapper>
      <Avatar size="xxLarge" user={{ name: agent.name, picture: agent.info.profileImageUrl }} />
      <Block weight="medium">{agent.name}</Block>
      <Block>Local Senior Living Expert</Block>
      <Link to={`mailto:${agent.info.email}`}>{agent.info.email}</Link><br />
      <Link to={`tel:${agent.info.workPhone}`}>{agent.info.workPhone}</Link>
    </AgentInfoWrapper>
    <SearchResultsAdTile
      title="Selling a home to pay the cost of senior living? "
      layout="row"
      imagePosition="right"
      buttonText="Learn more about selling my home"
      image={assetPath('vectors/house-sold.svg')}
    >
      Our partner <StyledImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
    </SearchResultsAdTile>
  </ShadowBox>
);

MatchedAgent.propTypes = {
  heading: string.isRequired,
  agent: agentPropType.isRequired,
};

export default MatchedAgent;
