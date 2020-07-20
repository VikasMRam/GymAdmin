import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { text as textPropType } from 'sly/common/propTypes/text';
import { weight as weightPropType } from 'sly/common/propTypes/weight';

export default {
  propTypes: {
    background: palettePropType.isRequired,
    backgroundVariation: variationPropType.isRequired,
    palette: palettePropType.isRequired,
    size: textPropType.isRequired,
    weight: weightPropType.isRequired,
    borderRadius: spacingPropType.isRequired,
  },
  defaultProps: {
    background: 'warning',
    backgroundVariation: 'base',
    palette: 'slate',
    size: 'tiny',
    weight: 'medium',
    borderRadius: 'large',
  },
};
