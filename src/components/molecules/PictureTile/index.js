import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image';

const StyledImage = styled(Image)`
  margin-bottom: 16px;

  width: ${size('picture', 'large', 'width')};
  height: ${size('picture', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 24px;

    width: ${size('picture', 'medium', 'width')};
    height: ${size('picture', 'medium', 'height')};

    :nth-child(odd) {
      margin-right: 24px;
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('picture', 'small', 'width')};
    height: ${size('picture', 'small', 'height')};

    margin-right: 24px;
    :nth-child(4n) {
      margin-right: 0px;
    }
  }
`;

const PictureTile = ({ src }) => {
  return <StyledImage src={src} />;
};

PictureTile.propTypes = {
  src: string.isRequired,
};

export default PictureTile;
