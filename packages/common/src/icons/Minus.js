import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/minus.svg').default
// import MinusSvg from './svg/minus.svg';

const Minus = forwardRef((props, ref) => <Icon ref={ref} name="minus" svg={svg} {...props} />);

Minus.displayName = 'MinusIcon';

export default Minus;