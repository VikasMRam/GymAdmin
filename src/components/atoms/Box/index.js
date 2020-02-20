import styled, { css } from 'styled-components';
import { oneOf, bool } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';
import { text as textPropType } from 'sly/propTypes/text';

const padding = ({ padding }) => size('spacing', padding);

const fontSize = ({ size: sizeProp }) => size('text', sizeProp);

const borderColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const backgroundColour = ({ backgroundPalette, backgroundVariation }) => backgroundPalette ? palette(backgroundPalette, backgroundVariation) : 'transparent';

const Box = styled.div`
  background: ${backgroundColour};
  border: ${size('border.regular')} solid ${borderColour};
  border-radius: ${ifProp('noBorderRadius', 0, size('spacing.small'))};
  padding: ${ifProp('noPadding', 0, padding)};
  font-size: ${fontSize};

  ${switchProp('snap', {
    top: css`
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `,
    bottom: css`
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `,
  })};
`;

Box.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  backgroundPalette: palettePropType,
  backgroundVariation: variationPropType,
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom']),
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
};

export default Box;
