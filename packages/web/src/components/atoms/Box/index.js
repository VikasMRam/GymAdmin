import styled from 'styled-components';
import { oneOf } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { borderPropType, borderRadiusPropType } from 'sly/common/propTypes/border';
import Block from 'sly/web/components/atoms/Block';

const Box = styled(Block)``;

Box.propTypes = {
  border: borderPropType,
  borderRadius: borderRadiusPropType,
  borderPalette: palettePropType,
  borderVariation: variationPropType,
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom', 'vertical', 'left', 'right', 'horizontal', 'all']),
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
