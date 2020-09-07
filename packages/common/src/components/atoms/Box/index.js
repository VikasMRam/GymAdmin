import styled from 'styled-components';

import Block from 'sly/common/components/atoms/Block';

const Box = styled(Block)``;

Box.defaultProps = {
  border: 'regular',
  borderRadius: 'small',
  borderPalette: 'slate.lighter-90',
  padding: 'xLarge',
};

export default Box;
