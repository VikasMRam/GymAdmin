import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/pool.svg').default;

const Pool = forwardRef((props, ref) => <Icon ref={ref} name="pool" svg={svg} {...props} />);

Pool.displayName = 'PoolIcon';

export default Pool;
