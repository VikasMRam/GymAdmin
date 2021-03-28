import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/pool.svg').default
// import PoolSvg from './svg/pool.svg';

const Pool = forwardRef((props, ref) => <Icon ref={ref} name="pool" svg={svg} {...props} />);

Pool.displayName = 'PoolIcon';

export default Pool;