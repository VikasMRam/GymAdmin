import { oneOf, string } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, getKey } from 'sly/components/themes';

const padding = ({ padding }) => size('spacing', padding);

const Box = styled.div`
  border: ${size('border.regular')} solid ${palette(2)};
  border-radius: ${size('spacing.tiny')};
  padding: ${padding};
`;

Box.propTypes = {
  palette: string,
  padding: oneOf(Object.keys(getKey('sizes.spacing'))),
};

Box.defaultProps = {
  palette: 'grayscale',
  padding: 'xLarge',
};

export default Box;
