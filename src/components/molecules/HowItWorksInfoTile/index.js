import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';


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

  width: 100%;
  max-width: ${size('layout.col6')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: unset;
    flex-shrink: 0;
    width: ${size('layout.col6')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: ${p => p.invert ? 1 : 0};
    margin-right: ${p => p.invert ? 0 : size('spacing.xLarge')};
    margin-left: ${p => p.invert ? size('spacing.xLarge') : 0};
  }
`;

const StyledImage = styled(Image)`
  display: block;
  width: 100%;
`;

const InfoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: ${p => p.invert ? 0 : 1};
  }
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
      <ImageWrapper invert={invert}>
        <StyledImage src={assetPath(imageUrl)} />
      </ImageWrapper>
      <InfoContentWrapper invert={invert}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <Block size="subtitle">{content}</Block>
      </InfoContentWrapper>
    </Wrapper>
  );
};

HowItWorksInfoTile.propTypes = {
  imageUrl: string.isRequired,
  heading: string.isRequired,
  content: string.isRequired,
  invert: bool,
};

export default HowItWorksInfoTile;
