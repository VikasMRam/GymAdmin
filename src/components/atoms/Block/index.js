import { oneOf } from 'prop-types';
import styled from 'styled-components';

import { getKey, size, palette } from 'sly/components/themes';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Block = styled.div`
  color: ${getColor};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  // TODO: review this with @jared,
  // for now let's make margin-bottom relative to font-size
  margin: 0 0 calc(${getSize('text')} * 0.25) 0;
`;

Block.propTypes = {
  palette: oneOf(Object.keys(getKey('palette'))),
  variation: oneOf(['base', 'accent', 'filler', 'stroke', 'background']),
  size: oneOf(Object.keys(getKey('sizes.text'))),
};

Block.defaultProps = {
  palette: 'slate',
  variation: 'base',
  size: 'body',
};

export default Block;
