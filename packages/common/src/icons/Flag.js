import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/flag.svg').default
// import FlagSvg from './svg/flag.svg';

const Flag = forwardRef((props, ref) => <Icon ref={ref} name="flag" svg={svg} {...props} />);

Flag.displayName = 'FlagIcon';

export default Flag;