import styled, { css } from 'styled-components';
import { oneOf, bool } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
import { text as textPropType } from 'sly/web/propTypes/text';

const padding = ({ padding }) => size('spacing', padding);

const fontSize = ({ size: sizeProp }) => size('text', sizeProp);

const borderColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

export const topSnap = css`
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const bottomSnap = css`
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const backgroundColour = ({ backgroundPalette, backgroundVariation }) => backgroundPalette ? palette(backgroundPalette, backgroundVariation) : 'transparent';

const Box = styled.div`
  background: ${backgroundColour};
  border: ${size('border.regular')} solid ${borderColour};
  border-radius: ${ifProp('noBorderRadius', 0, size('spacing.small'))};
  padding: ${ifProp('noPadding', 0, padding)};
  font-size: ${fontSize};

  ${switchProp('snap', {
    top: topSnap,
    bottom: bottomSnap,
    vertical: `${topSnap} ${bottomSnap}`,
  })};
`;

Box.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  backgroundPalette: palettePropType,
  backgroundVariation: variationPropType,
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom', 'vertical']),
  noBorderRadius: bool,
  noPadding: bool,
  size: textPropType,
};

Box.defaultProps = {
  palette: 'slate',
  variation: 'stroke',
  padding: 'xLarge',
  snap: 'none',
  size: 'body',
  backgroundVariation: 'base',
};

export default Box;
