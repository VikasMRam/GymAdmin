import React from 'react';

import Block from 'sly/common/components/atoms/Block';

const Badge = props => <Block {...props} />;

Badge.defaultProps = {
  display: 'inline-flex',
  padding: ['tiny', 'regular'],
  background: 'warning',
  backgroundVariation: 'base',
  palette: 'slate',
  size: 'tiny',
  weight: 'medium',
  borderRadius: 'large',
  align: 'center',
};

export default Badge;
