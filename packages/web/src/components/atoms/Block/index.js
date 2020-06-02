import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { weight as weightPropType } from 'sly/web/propTypes/weight';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { text as textPropType } from 'sly/web/propTypes/text';
import { withText } from 'sly/web/components/helpers/text';
import { withPad } from 'sly/web/components/helpers/pad';

const getColor = ({ palette: paletteProp, variation }) => ifProp([
  'palette',
  'variation',
], palette(paletteProp || 'primary', variation || 'base'));

const Block = withText(styled.div`
  ${withPad}
  ${ifProp('palette', css`color: ${getColor};`)}
`);

Block.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  size: textPropType,
  weight: weightPropType,
};

export default Block;
