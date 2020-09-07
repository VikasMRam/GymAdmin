import React from 'react';

import Block from 'sly/common/components/atoms/Block';

const Box = props => <Block {...props} />;

Box.defaultProps = {
  border: 'regular',
  borderRadius: 'small',
  borderPalette: 'slate.lighter-90',
  padding: 'xLarge',
};

export default Box;
