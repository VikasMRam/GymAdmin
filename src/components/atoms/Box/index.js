import { bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';
import { border as borderPropType } from 'sly/propTypes/border';

const padding = ({ padding }) => size('spacing', padding);
const border = ({ border }) => size('border', border);

const Box = styled.div`
  border: ${border} solid ${ifProp('highlighted', palette('base'), palette('stroke'))}};
  border-radius: ${size('spacing.small')};
  padding: ${padding};
  ${ifProp('shadow', css`
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.large')} ${palette('slate', 'filler')}80;
  `)}
`;

Box.propTypes = {
  palette: palettePropType,
  padding: spacingPropType,
  border: borderPropType,
  highlighted: bool,
  shadow: bool,
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
  border: 'regular',
};

export default Box;
