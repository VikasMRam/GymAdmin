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

const Box = styled.div`
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
};

export default Box;
