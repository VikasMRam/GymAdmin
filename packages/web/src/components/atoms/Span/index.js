import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { text as textPropType } from 'sly/web/propTypes/text';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { weight as weightPropType } from 'sly/web/propTypes/weight';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Span = styled.span`
  color: ${getColor};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  font-weight: ${p => size('weight', p.weight)};
`;

Span.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  size: textPropType,
  weight: weightPropType,
};

Span.defaultProps = {
  palette: 'slate',
  variation: 'base',
  size: 'body',
  weight: 'regular',
};

export default Span;
