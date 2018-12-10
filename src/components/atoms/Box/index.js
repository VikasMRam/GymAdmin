import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import { size, getKey, palette } from 'sly/components/themes';

const padding = ({ padding }) => size('spacing', padding);

const Box = styled.div`
  border: ${size('border.regular')} solid ${palette('stroke')};
  border-radius: ${size('spacing.small')};
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
  palette: oneOf(Object.keys(getKey('palette'))),
  padding: oneOf(Object.keys(getKey('sizes.spacing'))),
  snap: oneOf(['none', 'top', 'bottom']),
};

Box.defaultProps = {
  palette: 'slate',
  padding: 'xLarge',
  snap: 'none',
};

export default Box;
