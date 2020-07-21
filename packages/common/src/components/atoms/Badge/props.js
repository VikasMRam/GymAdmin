import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';

export default {
  propTypes: {
    palette: palettePropType,
    textPalette: palettePropType,
    variation: variationPropType,
    borderRadius: spacingPropType,
  },
  defaultProps: {
    palette: 'warning',
    variation: 'base',
    textPalette: 'slate',
    borderRadius: 'large',
  },
};
