import styled from 'styled-components';
import { oneOf, bool } from 'prop-types';

import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
import { text as textPropType } from 'sly/web/propTypes/text';
import { borderPropType, borderRadiusPropType } from 'sly/web/propTypes/border';

import {
  withColor,
  withPadding,
  withText,
  withBorder,
  withAlign,
  withSnap,
} from 'sly/web/components/helpers';

const Box = styled.div`
  ${withColor}
  ${withText}
  ${withPadding};
  ${withSnap};
  ${withBorder};
  ${withAlign};
`;

Box.propTypes = {
  border: borderPropType,
  borderRadius: borderRadiusPropType,
  borderPalette: palettePropType,
  borderVariation: variationPropType,
  backgroundPalette: palettePropType,
  backgroundVariation: variationPropType,
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom', 'vertical']),
  noBorderRadius: bool,
  noPadding: bool,
  size: textPropType,
};

Box.defaultProps = {
  border: 'regular',
  borderRadius: 'small',
  borderPalette: 'slate',
  borderVariation: 'lighter-90',
  padding: 'xLarge',
  snap: 'none',
  size: 'body',
  backgroundVariation: 'base',
};

export default Box;
