import React from 'react';
import styled, { css } from 'styled-components';

import { size, getKey } from 'sly/common/components/themes';
import agentPropType from 'sly/common/propTypes/agent';
import { upTo } from 'sly/common/components/helpers';
import { Block, Heading, Grid } from 'sly/common/components/atoms';
import Avatar from 'sly/web/components/molecules/Avatar';
import IconItem from 'sly/web/components/molecules/IconItem';

const Description = styled(Grid)`
  ${upTo('tablet', css`
    grid-template-columns: none;
    grid-gap: ${size('spacing.regular')};
  `)}
`;

const CommunityAgentSection = ({
  agent, ...props
}) => {
  const { name } = agent;
  const {
    bio, profileImageUrl, recentFamiliesHelped, experience,
  } = agent.info;

  return (
    <Block {...props}>
      <Grid
        dimensions={[getKey('sizes.element.xxxLarge'), '100%']}
        gap="large"
        align="center"
        pad="regular"
      >
        <Avatar size="xxxLarge" user={{ name, picture: { src: profileImageUrl } }} />
        <Block textAlign="left">
          <Block weight="medium" palette="slate">{name}</Block>
          <Block palette="grey">{bio}</Block>
        </Block>
      </Grid>
      <Description pad="xLarge" dimensions={['max-content', 'max-content']} gap="xxLarge">
        <IconItem icon="verified" iconPalette="slate">Trusted Partner</IconItem>
        <IconItem icon="favourite-light" iconPalette="slate">{recentFamiliesHelped} families helped</IconItem>
        {experience && <IconItem icon="favourite-light" iconPalette="slate">{experience} years of experience</IconItem>}
      </Description>
      <Heading size="body">What is a Local Senior Living Expert?</Heading>
      <Block>Our Local Senior Living Experts specialize in guiding families through the entire process of finding the right senior living community for their loved one. They live locally and can share their knowledge of current pricing and availability for communities near you. Working with an Expert is a completely free service to you.</Block>
    </Block>
  );
};

CommunityAgentSection.propTypes = {
  agent: agentPropType.isRequired,
};

export default CommunityAgentSection;
