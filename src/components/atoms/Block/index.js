import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import { getKey, size, palette } from 'sly/components/themes';

const getSize = type => p => size(type, p.size);
const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Block = styled.div`
  color: ${getColor};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  ${switchProp('weight', {
    medium: css`font-weight: 500;`,
    bold: css`font-weight: bold;`,
  })};

  // TODO: review this with @jared,
  // for now let's make margin-bottom relative to font-size
  margin: 0 0 calc(${getSize('text')} * 0.25) 0;
`;

Block.propTypes = {
  palette: oneOf(Object.keys(getKey('palette'))),
  variation: oneOf(['base', 'accent', 'filler', 'stroke', 'background']),
  size: oneOf(Object.keys(getKey('sizes.text'))),
  weight: oneOf(['regular', 'medium', 'bold']),
};

Block.defaultProps = {
  palette: 'slate',
  variation: 'base',
  size: 'body',
  weight: 'regular',
};

export default Block;
