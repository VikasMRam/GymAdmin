import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Heading, Block, Icon, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  padding-bottom: ${size('spacing.huge')};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
  order: ${p => p.invert ? 1 : 0};

  width: 100%;
  max-width: ${size('layout.col6')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: unset;
    flex-shrink: 0;
    width: ${size('layout.col6')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: ${p => p.invert ? 0 : size('spacing.xLarge')};
    margin-left: ${p => p.invert ? size('spacing.xLarge') : 0};
  }
`;

const StyledImage = styled(Image)`
  display: block;
  width: 100%;
`;

const InfoContentWrapper = styled.div`
  order: ${p => p.invert ? 0 : 1};
  display: flex;
  flex-direction: column;
`;

export const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.xLarge')};
`;

const HeadingWrapper = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const HowItWorksInfoTile = ({
  imageUrl,
  heading,
  content,
  invert,
}) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImage invert={invert} src={assetPath(imageUrl)} />
      </ImageWrapper>
      <InfoContentWrapper invert={invert}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <Block size="subtitle">{content}</Block>
      </InfoContentWrapper>
    </Wrapper>
  );
};

HowItWorksInfoTile.propTypes = {
  heading: string.isRequired,
  content: string.isRequired,
  invert: bool,
};

HowItWorksInfoTile.defaultProps = {
  iconPalette: 'black',
  borderless: false,
};

export default HowItWorksInfoTile;
