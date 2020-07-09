import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';


import { size, getKey, assetPath } from 'sly/web/components/themes';
import { Heading, Block } from 'sly/web/components/atoms';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

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

const StyledImage = styled(ResponsiveImage)`
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

const HeadingWrapper = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const HowItWorksInfoTile = ({
  imagePath,
  assetImagePath,
  heading,
  content,
  invert,
}) => {
  const { sizes, sources } = getKey('imageFormats.howItWorks');
  const src = assetImagePath && assetPath(assetImagePath);
  return (
    <Wrapper>
      <ImageWrapper invert={invert}>
        <StyledImage sizes={sizes} sources={sources} src={src} path={imagePath} />
      </ImageWrapper>
      <InfoContentWrapper invert={invert}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <Block size="subtitle">{content}</Block>
      </InfoContentWrapper>
    </Wrapper>
  );
};

HowItWorksInfoTile.propTypes = {
  imagePath: string,
  assetImagePath: string,
  heading: string.isRequired,
  content: string.isRequired,
  invert: bool,
};

export default HowItWorksInfoTile;
