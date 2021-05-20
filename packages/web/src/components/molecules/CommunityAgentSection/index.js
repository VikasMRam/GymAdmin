import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
// import { ifProp } from 'styled-tools';

import { size, getKey } from 'sly/common/components/themes';
import agentPropType from 'sly/common/propTypes/agent';
import { Block, Heading, Grid } from 'sly/common/components/atoms';
import Avatar from 'sly/web/components/molecules/Avatar';
import IconItem from 'sly/web/components/molecules/IconItem';
import { getImagePath } from 'sly/web/services/images';

const Description = styled(Grid)`
  grid-template-columns: none;
  grid-gap: ${size('spacing.regular')};
`;

const CommunityAgentSection = ({
  agent, layout, ...props
}) => {
  const {
    gallery,
    info,
  } = agent;
  const {
    recentFamiliesHelped, experience, displayName,
  } = info;


  let imageUrl = null;
  if (gallery && gallery.images && gallery.images.length > 0) {
    imageUrl = getImagePath(encodeURI(gallery.images[0].path.replace(/\.jpe?g$/i, '.jpg')));
  }
  let dimensions = ['max-content', 'max-content'];
  if (layout === 'homeBase') {
    dimensions = ['min-content', 'min-content'];
  }

  return (
    <Block {...props}>
      <Grid
        dimensions={[getKey('sizes.element.xxxLarge'), `calc(100% - ${getKey('sizes.element.xxxLarge')} - ${getKey('sizes.spacing.large')})`]}
        gap="large"
        align="center"
        pad="regular"
      >
        <Avatar size="xxxLarge" user={{ name: displayName, picture: { src: imageUrl } }} />
        <Block textAlign="left">
          <Block weight="medium" palette="slate">{displayName}</Block>
          <Block palette="grey">Seniorly Local Advisor</Block>
        </Block>
      </Grid>
      <Description pad="xLarge" dimensions={dimensions} gap="xxLarge">
        <IconItem icon="verified" iconPalette="slate">Trusted Partner</IconItem>
        <IconItem icon="favourite-light" iconPalette="slate">{recentFamiliesHelped} families helped</IconItem>
        {experience && <IconItem icon="favourite-light" iconPalette="slate">{experience} years of experience</IconItem>}
      </Description>
      <Heading size="body">What is a Seniorly Local Advisor?</Heading>
      <Block>
        Our Seniorly Local Advisors specialize in guiding families through the entire process of finding the right senior living community for their loved one. They live locally and can share their knowledge of a community’s pricing, availability, amenities, and insights about the staff. They also know about current promotions and can even help negotiate rent. Working with an Expert is a completely free service to you.
      </Block>
    </Block>
  );
};

CommunityAgentSection.propTypes = {
  agent: agentPropType.isRequired,
  layout: string,
};
CommunityAgentSection.defaultProps = {
  layout: 'community',
};

export default CommunityAgentSection;
