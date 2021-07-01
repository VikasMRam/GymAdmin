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

      <Heading pad="xs" font="title-s">How our FREE service works</Heading>
      <Block>
        Our Seniorly Local Advisors will guide you through the entire process of finding the right senior living
        community. After they assess you or your loved one’s lifestyle, care needs, budget, they will send you
        information on senior living communities that fit your needs. Since they live locally, they can schedule and
        accomapany you on tours and even neogotiate rent once you selected the right home.
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

