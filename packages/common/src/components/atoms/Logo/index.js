import React from 'react';

import svg from './getSvg';

import Block from 'sly/common/components/atoms/Block';

const Logo = props => (
  <Block
    dangerouslySetInnerHTML={{ __html: svg }}
    {...props}
  />
);

export default Logo;
