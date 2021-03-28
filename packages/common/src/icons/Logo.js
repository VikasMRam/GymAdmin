import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/logo.svg').default
// import LogoSvg from './svg/logo.svg';

const Logo = forwardRef((props, ref) => <Icon ref={ref} name="logo" svg={svg} {...props} />);

Logo.displayName = 'LogoIcon';

export default Logo;