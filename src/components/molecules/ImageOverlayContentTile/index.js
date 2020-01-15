import React from 'react';
import styled from 'styled-components';
import { string, node } from 'prop-types';

import { assetPath, size } from 'sly/components/themes';
import { ResponsiveImage } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: black;
`;
export const StyledImage = styled(ResponsiveImage)`
  border-radius: ${size('spacing.tiny')};
  width: 100%;
  height: 100%;
  opacity: .75;
  object-fit: cover;
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
  <Wrapper className={className}>
    <StyledImage path={image} aspectRatio="16:9" />
    <ContentWrapper>
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
