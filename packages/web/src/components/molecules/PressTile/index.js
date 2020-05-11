import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';

import { assetPath, size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import border from 'sly/components/helpers/border';
import borderRadius from 'sly/components/helpers/borderRadius';
import { ResponsiveImage } from 'sly/components/atoms';

const Wrapper = borderRadius(styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.xLarge')};
`, 'tiny');

const BorderedWrapper = border(Wrapper, 'regular', 'secondary', 'stroke');

const TextWrapper = textAlign(pad(styled.div``));

const StyledImage = styled(ResponsiveImage)`
  object-fit: contain;
`;

const PressTile = ({
  text, imageUrl, borderless,
}) => {
  const WrapperComponent = borderless ? Wrapper : BorderedWrapper;
  const image = assetPath(imageUrl);
  return (
    <WrapperComponent>
      <TextWrapper>{text}</TextWrapper>
      <StyledImage src={image} />
    </WrapperComponent>
  );
};

PressTile.propTypes = {
  text: string.isRequired,
  imageUrl: string.isRequired,
  borderless: bool.isRequired,
};

PressTile.defaultProps = {
  borderless: false,
};

export default PressTile;
