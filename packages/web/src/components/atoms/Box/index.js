import styled from 'styled-components';
import { oneOf } from 'prop-types';

import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
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
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom', 'vertical']),
};

Box.defaultProps = {
  border: 'regular',
  borderRadius: 'small',
  borderPalette: 'slate',
  borderVariation: 'lighter-90',
  padding: 'xLarge',
  snap: 'none',
};

export default Box;
