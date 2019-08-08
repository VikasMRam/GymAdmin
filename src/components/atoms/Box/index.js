import styled, { css } from 'styled-components';
import { oneOf, bool } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';

const padding = ({ padding }) => size('spacing', padding);

const Box = styled.div`
  border: ${size('border.regular')} solid ${palette('stroke')};
  border-radius: ${ifProp('noBorderRadius', 0, size('spacing.small'))};
  padding: ${padding};

  ${switchProp('snap', {
    top: css`
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `,
    bottom: css`
      border-bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `,
  })};
`;

Box.propTypes = {
  palette: palettePropType,
  padding: spacingPropType,
  snap: oneOf(['none', 'top', 'bottom']),
  noBorderRadius: bool,
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
  snap: 'none',
};

export default Box;
