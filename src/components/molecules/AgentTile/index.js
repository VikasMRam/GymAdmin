import React from 'react';
import styled from 'styled-components';

import agentPropType from 'sly/propTypes/agent';
import { Box, Image, Block } from 'sly/components/atoms';
import { size } from 'sly/components/themes';

const Data = styled.div`
  margin: ${size('spacing.xLarge')};
`;

const AgentTile = ({
  agent,
}) => {
  const { agentInfo } = agent;
  const { profileImgUrl } = agentInfo;

  return (
    <Box>
      <Image src={profileImgUrl} aspectRatio="3:2" />
      <Data>
        <Block><Link to={}></Link></Block>
      </Data>
    </Box>
  );
};

AgentTile.propTypes = {
  agent: agentPropType,
};


export default AgentTile;
