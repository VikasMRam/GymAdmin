import styled from 'styled-components';
import { oneOf } from 'prop-types';

import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
import { borderPropType, borderRadiusPropType } from 'sly/web/propTypes/border';
import Block from 'sly/web/components/atoms/Block';

const Box = styled(Block)``;

Box.displayName = 'Box';

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
