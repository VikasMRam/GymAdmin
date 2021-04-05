import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/minus.svg').default;

const Minus = forwardRef((props, ref) => <Icon ref={ref} name="minus" svg={svg} {...props} />);

Minus.displayName = 'MinusIcon';

export default Minus;
