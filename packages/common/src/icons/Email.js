import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/email.svg').default;

const Email = forwardRef((props, ref) => <Icon ref={ref} name="email" svg={svg} {...props} />);

Email.displayName = 'EmailIcon';

export default Email;
