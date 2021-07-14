import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/awesome.svg').default;

const Awesome = forwardRef((props, ref) => <Icon ref={ref} name="awesome" svg={svg} {...props} />);

Awesome.displayName = 'AwesomeIcon';

export default Awesome;
