import React from 'react';
import styled from 'styled-components';
import { string, number, oneOfType, node } from 'prop-types';
import { prop } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { ResponsiveImage } from 'sly/components/atoms';

const Wrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'filler')};
  height: ${prop('mobileHeight', 'auto')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${prop('tabletHeight', 'auto')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    height: ${prop('laptopHeight', 'auto')};
  }
`;

const StyledImage = styled(ResponsiveImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;

export const MiddleContent = styled.div`
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContentOverImage = ({ image, imageAlt, mobileHeight, tabletHeight, laptopHeight, imageHeight, children }) => (
  <Wrapper mobileHeight={mobileHeight} tabletHeight={tabletHeight} laptopHeight={laptopHeight}>
    <StyledImage path={image} alt={imageAlt} height={imageHeight} />
    {children}
  </Wrapper>
);

ContentOverImage.propTypes = {
  image: string.isRequired,
  imageAlt: string,
  imageHeight: oneOfType([number, string]),
  mobileHeight: string,
  tabletHeight: string,
  laptopHeight: string,
  children: node,
};

ContentOverImage.defaultProps = {
  imageAlt: 'content-over-image',
};

export default ContentOverImage;
