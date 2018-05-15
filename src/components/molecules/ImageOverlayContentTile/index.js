import React from 'react';
import styled from 'styled-components';
import { string, node, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';

import { Image } from 'sly/components/atoms';

const width = p => size('picture', p.size, 'width');
const Wrapper = styled.div`
  width: ${width};
  position: relative
`;
const StyledImage = styled(Image)`
  border-radius: ${size('border.large')};
  width: ${width};
`;
const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 ${size('spacing.large')};
  text-align: center;
`;

const ImageOverlayContentTile = ({
  image, children, size,
}) => (
  <Wrapper size={size}>
    <StyledImage src={image} size={size} />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </Wrapper>
);

ImageOverlayContentTile.propTypes = {
  image: string.isRequired,
  children: node,
  size: oneOf(['regular']),
};

ImageOverlayContentTile.defaultProps = {
  size: 'regular',
};

export default ImageOverlayContentTile;
