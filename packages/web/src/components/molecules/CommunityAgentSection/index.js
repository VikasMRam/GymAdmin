import React from 'react';
import { string } from 'prop-types';
// import { ifProp } from 'styled-tools';

import agentPropType from 'sly/common/propTypes/agent';
import { Block, Heading, Grid } from 'sly/common/system';
import Avatar from 'sly/web/components/molecules/Avatar';
import { getImagePath } from 'sly/web/services/images';


const CommunityAgentSection = ({
  agent, layout, ...props
}) => {
  const {
    gallery,
    info,
  } = agent;
  const {
    recentFamiliesHelped, displayName,
  } = info;


  let imageUrl = null;
  if (gallery && gallery.images && gallery.images.length > 0) {
    imageUrl = getImagePath(encodeURI(gallery.images[0].path.replace(/\.jpe?g$/i, '.jpg')));
  }


  return (
    <Block {...props}>
      <Grid
        gridTemplateColumns="4.5rem 1fr"
        gridGap="m"
        align="center"
        pad="l"
      >
        <Avatar size="xxxLarge" user={{ name: displayName, picture: { src: imageUrl } }} />
        <Block display="flex" flexDirection="column" justifyContent="center" textAlign="left">
          <Block font="title-m" color="primary">{displayName}</Block>
          {recentFamiliesHelped > 0 && <Block>{recentFamiliesHelped} families helped</Block>}
        </Block>
      </Grid>

      <Heading font="title-s">What is a Seniorly Local Advisor?</Heading>
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
CommunityAgentSection.typeHydrationId = 'CommunityAgentSection';

export default CommunityAgentSection;

