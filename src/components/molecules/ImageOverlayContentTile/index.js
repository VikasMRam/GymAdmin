import React from 'react';
import styled from 'styled-components';
import { string, node } from 'prop-types';

import { size } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative
`;
export const StyledImage = styled(Image)`
  border-radius: ${size('spacing.tiny')};
  width: 100%;
  height: 100%;
`;
export const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 ${size('spacing.large')};
  width: 100%;
  text-align: center;
`;

const ImageOverlayContentTile = ({
  image, children, className,
}) => (
  <Wrapper size={size} className={className}>
    <StyledImage src={image} size={size} />
    <ContentWrapper size={size}>
      {children}
    </ContentWrapper>
  </Wrapper>
);

ImageOverlayContentTile.propTypes = {
  className: string,
  image: string.isRequired,
  children: node,
};

export default ImageOverlayContentTile;
