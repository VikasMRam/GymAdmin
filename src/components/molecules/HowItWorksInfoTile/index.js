import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Icon, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  padding-top: ${size('spacing.massive')};
  padding-bottom: ${size('spacing.huge')};
  // border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  // border-radius: ${size('spacing.tiny')};
`;

const ImageWrapper = styled(Image)`
  order: ${p => p.invert ? 1 : 0};
  width: ${size('picture.xLarge.width')};
  height: ${size('picture.xLarge.height')};
  margin-right: ${p => p.invert ? 0 : size('spacing.xLarge')};
  margin-left: ${p => p.invert ? size('spacing.xLarge') : 0};
`;

const InfoContentWrapper = styled.div`
  order: ${p => p.invert ? 0 : 1};
  display: flex;
  flex-direction: column;
  margin-top: calc(${size('spacing.huge')} + ${size('spacing.small')});
`;

export const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.xLarge')};
`;

const HeadingWrapper = styled.div`
  font-size: ${size('text.title')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const ContentWrapper = styled.div`
  font-size: ${size('text.subtitle')};
`;

const HowItWorksInfoTile = ({
  heading, content, invert,
}) => {
  return (
    <Wrapper>
      <ImageWrapper invert={invert} src={assetPath('images/how-it-works/macBook-regular.jpg')} />
      <InfoContentWrapper invert={invert}>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <ContentWrapper>{content}</ContentWrapper>
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
