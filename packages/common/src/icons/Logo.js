import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/logo.svg').default;

const Logo = forwardRef((props, ref) => <Icon ref={ref} name="logo" svg={svg} {...props} />);

Logo.displayName = 'LogoIcon';

export default Logo;
