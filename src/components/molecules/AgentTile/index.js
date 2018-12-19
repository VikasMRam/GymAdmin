import React from 'react';
import styled from 'styled-components';

import agentPropType from 'sly/propTypes/agent';
import { Box, Image, Block, Link } from 'sly/components/atoms';
import { size } from 'sly/components/themes';
import IconListItem from 'sly/components/molecules/IconListItem';

const Wrapper = 'div';

const ProfileImage = styled(Image)`
  border-radius: ${size('spacing.small')};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const AgentTile = ({
  agent,
}) => {
  const { agentInfo: info, url } = agent;

  return (
    <Wrapper>
      <ProfileImage src={info.profileImgUrl} aspectRatio="3:2" />
      <Box snap="top">
        <Block><Link to={url}>{info.displayName}</Link></Block>
        <ul>
          <li><IconListItem icon="blah" text="blah" /></li>
        </ul>
      </Box>
    </Wrapper>
  );
};

AgentTile.propTypes = {
  agent: agentPropType,
};


export default AgentTile;
