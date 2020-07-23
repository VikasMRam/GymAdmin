import React from 'react';
import { string, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { element as elementPropType } from 'sly/common/propTypes/element';
import { size, palette } from 'sly/web/components/themes';
import { ResponsiveImage } from 'sly/web/components/atoms';

const dimensionToTextSizeMap = {
  small: 'tiny',
  regular: 'body',
  large: 'subtitle',
  xLarge: 'subtitle',
  xxLarge: 'title',
  xxxLarge: 'title',
  huge: 'title',
  xHuge: 'hero',
  xxHuge: 'hero',
};

const dimensions = ({ size: sizeProp }) => size('element', sizeProp);

const fontSize = ({ size: sizeProp }) => size('text', dimensionToTextSizeMap[sizeProp]);

const styles = css`
  border-radius: 50%;
  width: ${dimensions};
  height: ${dimensions};
`;

const StyledImg = styled(ResponsiveImage)`
  ${styles};
`;

const StyledDiv = styled.div`
  ${styles};

  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette('filler')};
  color: ${palette(prop('textPalette'), 'base')};
  font-size: ${fontSize};
  font-weight: ${size('weight.medium')};
`;

const Avatar = ({ user, ...props }) =>
  user.picture ? (
    <StyledImg src={user.picture.src} path={user.picture.path} title={user.name} {...props} />
  ) : (
    <StyledDiv data-title={user.name} {...props}>
      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
    </StyledDiv>
  );

Avatar.propTypes = {
  palette: palettePropType,
  textPalette: palettePropType,
  size: elementPropType,
  user: shape({
    name: string.isRequired,
    picture: shape({
      src: string,
      path: string,
    }),
  }),
};

Avatar.defaultProps = {
  palette: 'primary',
  textPalette: 'white',
  size: 'large',
};

export default Avatar;
