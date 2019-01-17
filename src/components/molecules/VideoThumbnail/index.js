import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { Icon, Image, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  position: relative;
  height: inherit;
`;

const CenterContent = styled.div`
  width: 100%;
  z-index: 1;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  height: inherit;
`;

const VideoThumbnail = ({
  src, onClick,
}) => (
  <Wrapper>
    <CenterContent onClick={onClick}>
      <Icon
        icon="play"
        size="xxLarge"
        palette="white"
      />
      <Block size="subtitle" weight="medium" palette="white">
        Watch Video
      </Block>
    </CenterContent>
    <StyledImage src={src} />
  </Wrapper>
);

VideoThumbnail.propTypes = {
  src: string.isRequired,
  onClick: func,
};

export default VideoThumbnail;
