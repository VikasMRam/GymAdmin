import { string, bool } from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size as sz } from 'sly/components/themes';

const getSize = type => props => sz(type, prop('size')(props))(props);

const Block = styled.div`
  background-color: ${ifProp('opaque', palette(0, true), 'transparent')};
  color: ${palette({ grayscale: 0 }, 1)};
  font-size: ${getSize('text')};
  line-height: ${getSize('lineHeight')};
`;

Block.propTypes = {
  palette: string,
  opaque: bool,
  size: string,
};

Block.defaultProps = {
  palette: 'grayscale',
  size: 'body',
};

export default Block;
