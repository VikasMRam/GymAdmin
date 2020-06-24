import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { Icon, ResponsiveImage, Block } from 'sly/web/components/atoms';

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

const StyledImage = styled(ResponsiveImage)`
  width: 100%;
  object-fit: cover;
  height: inherit;
`;

// has to be Class component as ref won't work with function components
// eslint-disable-next-line react/prefer-stateless-function
export default class VideoThumbnail extends Component {
  static propTypes = {
    path: string,
    src: string,
    onClick: func,
    aspectRatio: string,
  };

  static defaultProps = {
    aspectRatio: '3:2',
  };

  render() {
    const { src, path, onClick, aspectRatio } = this.props;

    return (
      <Wrapper>
        <CenterContent onClick={onClick}>
          <Icon
            icon="play"
            size="72px"
            palette="white"
          />
          <Block size="subtitle" weight="medium" palette="white">
            Watch Video
          </Block>
        </CenterContent>
        <StyledImage src={src} path={path} aspectRatio={aspectRatio} loading="auto" />
      </Wrapper>
    );
  }
}
