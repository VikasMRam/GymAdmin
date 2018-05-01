import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image';

// TODO: This component and Mobile view of Similar Community shares the same dimension. Find a way to reuse

const Wrapper = styled.div`
  margin-bottom: 16px;

  width: ${size('picture', 'large', 'width')};
  height: ${size('picture', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 24px;

    width: ${size('picture', 'medium', 'width')};
    height: ${size('picture', 'medium', 'height')};

    img:nth-child(odd) {
      margin-right: 24px;
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('picture', 'small', 'width')};
    height: ${size('picture', 'small', 'height')};
  }
`;

const StyledImage = styled(Image)`
  width: ${size('picture', 'large', 'width')};
  height: ${size('picture', 'large', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('picture', 'medium', 'width')};
    height: ${size('picture', 'medium', 'height')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('picture', 'small', 'width')};
    height: ${size('picture', 'small', 'height')};
  }
`;

const PictureTile = ({ src }) => {
  return (
    <Wrapper>
      <StyledImage src={src} />
    </Wrapper>
  );
};

export default PictureTile;
