import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/more-horizontal.svg').default
// import MoreHorizontalSvg from './svg/more-horizontal.svg';

const MoreHorizontal = forwardRef((props, ref) => <Icon ref={ref} name="more-horizontal" svg={svg} {...props} />);

MoreHorizontal.displayName = 'MoreHorizontalIcon';

export default MoreHorizontal;