import { oneOf } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { text as textPropType } from 'sly/propTypes/text';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';

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
  weight: oneOf(['regular', 'medium', 'light']),
};

Span.defaultProps = {
  palette: 'slate',
  variation: 'base',
  size: 'body',
  weight: 'regular',
};

export default Span;
