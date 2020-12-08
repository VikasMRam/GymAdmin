import React from 'react';

import Block from 'sly/common/components/atoms/Block';

// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
const svg = require('!raw-loader!./svg/seniorlyWinterLogo-regular.svg').default;

const Logo = props => (
  <Block
    dangerouslySetInnerHTML={{ __html: svg }}
    {...props}
  />
);

Logo.defaultProps = {
  palette: 'primary',
};

export default Logo;
