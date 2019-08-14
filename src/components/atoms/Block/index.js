import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { weight as weightPropType } from 'sly/propTypes/weight';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { text as textPropType } from 'sly/propTypes/text';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Block = styled.div`
  ${ifProp('palette', css`color: ${getColor}`)};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  font-weight: ${p => size('weight', p.weight)};
`;

Block.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  size: textPropType,
  weight: weightPropType,
};

Block.defaultProps = {
  palette: 'slate',
  variation: 'base',
  weight: 'regular',
};

export default Block;
