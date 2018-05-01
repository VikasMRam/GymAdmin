import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image';

const StyledImage = styled(Image)`
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.regular')};

  width: ${size('picture', 'large', 'width')};
  height: ${size('picture', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: ${size('spacing.xLarge')};

    width: ${size('picture', 'regular', 'width')};
    height: ${size('picture', 'regular', 'height')};

    :nth-child(odd) {
      ${size('spacing.xLarge')};
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('picture', 'small', 'width')};
    height: ${size('picture', 'small', 'height')};

    margin-right: ${size('spacing.xLarge')};
    :nth-child(4n) {
      margin-right: 0;
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
