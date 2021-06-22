import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import Image from 'sly/common/system/Image';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Play from 'sly/common/icons/Play';

const CenterContent = styled(Flex)`
  width: 100%;
  z-index: 1;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 100%;
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
    className: string,
  };

  static defaultProps = {
    aspectRatio: '3:2',
  };

  render() {
    const { src, path, onClick, aspectRatio, className, ...props } = this.props;

    return (
      <Block className={className} position="relative" height="inherit">
        <CenterContent onClick={onClick}>
          <Play
            size="xxl"
            color="white"
            mr="s"
          />
          <Block fontSize="20px" /* TODO: Should add style to set 20px on all screens? */ lineHeight="title-s" color="white">
            Watch Video
          </Block>
        </CenterContent>
        <StyledImage src={src} path={path} aspectRatio={aspectRatio} {...props} />
      </Block>
    );
  }
}
