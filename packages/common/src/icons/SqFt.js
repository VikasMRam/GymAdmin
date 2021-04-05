import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/sq-ft.svg').default;

const SqFt = forwardRef((props, ref) => <Icon ref={ref} name="sq-ft" svg={svg} {...props} />);

SqFt.displayName = 'SqFtIcon';

export default SqFt;
