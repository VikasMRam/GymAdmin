import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/lock.svg').default
// import LockSvg from './svg/lock.svg';

const Lock = forwardRef((props, ref) => <Icon ref={ref} name="lock" svg={svg} {...props} />);

Lock.displayName = 'LockIcon';

export default Lock;