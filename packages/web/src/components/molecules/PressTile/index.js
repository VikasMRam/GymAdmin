import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';

import { assetPath, size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import border from 'sly/web/components/helpers/border';
import borderRadius from 'sly/web/components/helpers/borderRadius';
import { ResponsiveImage } from 'sly/web/components/atoms';
import { textAlign } from 'sly/web/components/helpers/text';

const Wrapper = borderRadius(styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.xLarge')};
`, 'tiny');

const BorderedWrapper = border(Wrapper, 'regular', 'primary', 'stroke');

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
