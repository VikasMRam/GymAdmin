import { oneOf } from 'prop-types';
import styled from 'styled-components';

import { getKey, size, palette } from 'sly/components/themes';
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
  palette: oneOf(Object.keys(getKey('palette'))),
  variation: variationPropType,
  size: oneOf(Object.keys(getKey('sizes.text'))),
  weight: oneOf(['regular', 'medium', 'light']),
};

Span.defaultProps = {
  palette: 'slate',
  variation: 'base',
  size: 'body',
  weight: 'regular',
};

export default Span;
