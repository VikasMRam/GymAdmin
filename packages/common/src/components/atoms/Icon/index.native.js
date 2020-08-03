import React from 'react';
import { Image } from 'react-native';
import { string, number, bool } from 'prop-types';
import styled from 'styled-components';

import iconPaths from './iconPaths';

import { getKey, palette } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';

const iconSize = ({ size }) => {
  const textSize = getKey(`sizes.text.${size}`);
  const lineHeight = getKey(`sizes.lineHeight.${size}`);
  return textSize ? `${textSize.replace('px', '') * lineHeight}px` : size;
};
const getTransform = ({ rotate, flip }) => `transform: rotate(${rotate * 90}deg)${flip ? ' scaleX(-1) scaleY(-1)' : ''}`;

/**
 * To make Icon compatible with text sizes, but backward compatible with the
 * deprecated icon size
 */
// sizes relative to set font-size
const Wrapper = styled(Block)`
  ${getTransform};
  min-width: ${iconSize};
  height: ${iconSize};
`;

const StyledImage = styled(Image)`
  align-self: center;
  tintColor: ${palette('base')};
`;

const Icon = styled(({ icon, palette, ...props }) => {
  const source = iconPaths[icon];

  if (!source) {
    return <Block palette="danger">Icon not found</Block>;
  }

  return (
    <Wrapper {...props} data-cy={icon}>
      <StyledImage palette={palette} source={source} />
    </Wrapper>
  );
})``;

Icon.displayName = 'Icon';

Icon.propTypes = {
  icon: string.isRequired,
  flip: bool,
  rotate: number,
};

Icon.defaultProps = {
  flip: false,
  rotate: 0,
  size: 'body',
  align: 'center',
  palette: 'slate',
};

export default Icon;
