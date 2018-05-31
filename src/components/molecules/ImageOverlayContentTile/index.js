import React from 'react';
import styled from 'styled-components';
import { string, node, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';

import { Image } from 'sly/components/atoms';

const width = p => size('picture', p.size, 'width');
const height = p => size('picture', p.size, 'height');
const Wrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${width}) {
    width: ${width};
  }
  position: relative
`;
const StyledImage = styled(Image)`
  border-radius: ${size('border.large')};
  width: 100%;
  height: initial;
  @media screen and (min-width: ${width}) {
    width: ${width};
    height: ${height};
  }
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 ${size('spacing.large')};
  width: 100%;
  text-align: center;
  @media screen and (min-width: ${width}) {
    width: inherit;
  }
`;

const ImageOverlayContentTile = ({
  image, children, size,
}) => (
  <Wrapper size={size}>
    <StyledImage src={image} size={size} />
    <ContentWrapper size={size}>
      {children}
    </ContentWrapper>
  </Wrapper>
);

ImageOverlayContentTile.propTypes = {
  image: string.isRequired,
  children: node,
  size: oneOf(['small', 'regular', 'large', 'xLarge']),
};

ImageOverlayContentTile.defaultProps = {
  size: 'regular',
};

export default ImageOverlayContentTile;
