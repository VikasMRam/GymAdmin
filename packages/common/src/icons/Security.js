import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/security.svg').default;

const Security = forwardRef((props, ref) => <Icon ref={ref} name="security" svg={svg} {...props} />);

Security.displayName = 'SecurityIcon';

export default Security;
