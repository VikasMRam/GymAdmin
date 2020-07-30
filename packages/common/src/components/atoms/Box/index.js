import styled from 'styled-components';

import { withShadow } from 'sly/common/components/helpers';
import Block from 'sly/common/components/atoms/Block';

const Box = styled(Block)`
  ${withShadow}
`;

Box.defaultProps = {
  border: 'regular',
  borderRadius: 'small',
  borderPalette: 'slate',
  borderVariation: 'lighter-90',
  padding: 'xLarge',
  snap: 'none',
};

export default Box;
