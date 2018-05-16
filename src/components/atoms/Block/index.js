import { string, bool } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';

const getSize = type => p => size(type, p.size);

const Block = styled.div`
  background-color: ${ifProp('opaque', palette(0, true), 'transparent')};
  color: ${palette(0)};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
  // TODO: review this with @jared,
  // for now let's make margin-bottom relative to font-size
  margin: 0 0 calc(${getSize('text')} * 0.25) 0;
`;

Block.propTypes = {
  palette: string,
  opaque: bool,
  size: string,
};

Block.defaultProps = {
  palette: 'slate',
  size: 'body',
};

export default Block;
