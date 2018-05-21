import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image';

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('picture.regular.width')};
    height: ${size('picture.regular.height')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('picture.small.width')};
    height: ${size('picture.small.height')};
  }
`;

const PictureTile = ({ src }) => {
  return <StyledImage src={src} />;
};

PictureTile.propTypes = {
  src: string.isRequired,
};

export default PictureTile;
