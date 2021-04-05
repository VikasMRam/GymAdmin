import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/email-2.svg').default;

const Email2 = forwardRef((props, ref) => <Icon ref={ref} name="email-2" svg={svg} {...props} />);

Email2.displayName = 'Email2Icon';

export default Email2;
