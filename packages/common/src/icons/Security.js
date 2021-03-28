import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/security.svg').default
// import SecuritySvg from './svg/security.svg';

const Security = forwardRef((props, ref) => <Icon ref={ref} name="security" svg={svg} {...props} />);

Security.displayName = 'SecurityIcon';

export default Security;