import React from 'react';

import Block from 'sly/common/components/atoms/Block';

const Paragraph = props => <Block {...props} />;

Paragraph.defaultProps = {
  palette: 'slate',
  size: 'body',
  lineHeight: '1.5',
  margin: '0',
  pad: 'large',
};

export default Paragraph;
