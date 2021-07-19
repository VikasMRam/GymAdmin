import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/arrow-forward.svg').default;

const ArrowForward = forwardRef((props, ref) => <Icon ref={ref} name="arrow-forward" svg={svg} {...props} />);

ArrowForward.displayName = 'ArrowForwardIcon';

export default ArrowForward;
