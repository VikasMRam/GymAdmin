import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/more-horizontal.svg').default;

const MoreHorizontal = forwardRef((props, ref) => <Icon ref={ref} name="more-horizontal" svg={svg} {...props} />);

MoreHorizontal.displayName = 'MoreHorizontalIcon';

export default MoreHorizontal;
