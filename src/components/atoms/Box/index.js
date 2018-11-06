import { oneOf, string } from 'prop-types';
import styled from 'styled-components';


import { size, getKey, palette } from 'sly/components/themes';

const padding = ({ padding }) => size('spacing', padding);

const Box = styled.div`
  border: ${size('border.regular')} solid ${palette('filler')};
  border-radius: ${size('spacing.tiny')};
  padding: ${padding};
`;

Box.propTypes = {
  palette: string,
  padding: oneOf(Object.keys(getKey('sizes.spacing'))),
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
};

export default Box;
