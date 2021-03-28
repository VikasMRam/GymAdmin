import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/sq-ft.svg').default
// import SqFtSvg from './svg/sq-ft.svg';

const SqFt = forwardRef((props, ref) => <Icon ref={ref} name="sq-ft" svg={svg} {...props} />);

SqFt.displayName = 'SqFtIcon';

export default SqFt;