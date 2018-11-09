import { oneOf, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, getKey, palette } from 'sly/components/themes';

const padding = ({ padding }) => size('spacing', padding);
const border = ({ border }) => size('border', border);

const Box = styled.div`
  border: ${border} solid ${ifProp('highlighted', palette('base'), palette('stroke'))}};
  border-radius: ${size('spacing.small')};
  padding: ${padding};
`;

Box.propTypes = {
  palette: oneOf(Object.keys(getKey('palette'))),
  padding: oneOf(Object.keys(getKey('sizes.spacing'))),
  border: oneOf(Object.keys(getKey('sizes.border'))),
  highlighted: bool,
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
  border: 'regular',
};

export default Box;
