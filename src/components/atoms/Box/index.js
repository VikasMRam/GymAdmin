import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';
import { border as borderPropType } from 'sly/propTypes/border';

const padding = ({ padding }) => size('spacing', padding);

const Box = styled.div`
  border: ${size('border.regular')} solid ${palette('stroke')};
  border-radius: ${size('spacing.small')};
  padding: ${padding};
`;

Box.propTypes = {
  palette: palettePropType,
  padding: spacingPropType,
  border: borderPropType,
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
  snap: 'none',
};

export default Box;
