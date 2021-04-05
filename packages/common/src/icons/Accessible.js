import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/accessible.svg').default;

const Accessible = forwardRef((props, ref) => <Icon ref={ref} name="accessible" svg={svg} {...props} />);

Accessible.displayName = 'AccessibleIcon';

export default Accessible;
