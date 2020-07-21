import React from 'react';

import Block from 'sly/web/components/atoms/Block';

const svg = require('./svg/seniorlyLogo-regular.svg').default;

const Logo = props => (
  <Block
    dangerouslySetInnerHTML={{ __html: svg }}
    {...props}
  />
);

export default Logo;
