import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/lock.svg').default;

const Lock = forwardRef((props, ref) => <Icon ref={ref} name="lock" svg={svg} {...props} />);

Lock.displayName = 'LockIcon';

export default Lock;
