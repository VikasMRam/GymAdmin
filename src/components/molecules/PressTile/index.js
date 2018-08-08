import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.xLarge')};
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('secondary', 3)};
  border-radius: ${size('spacing.tiny')};
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledImage = styled(Image)`
  object-fit: contain;
`;

const PressTile = ({
  text, imageUrl,
}) => {
  return (
    <Wrapper>
      <TextWrapper>{text}</TextWrapper>
      <StyledImage src={imageUrl} />
    </Wrapper>
  );
};

PressTile.propTypes = {
  text: string.isRequired,
  imageUrl: string.isRequired,
};

PressTile.defaultProps = {
  iconPalette: 'black',
  borderless: false,
};

export default PressTile;