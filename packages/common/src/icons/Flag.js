import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/flag.svg').default;

const Flag = forwardRef((props, ref) => <Icon ref={ref} name="flag" svg={svg} {...props} />);

Flag.displayName = 'FlagIcon';

export default Flag;
