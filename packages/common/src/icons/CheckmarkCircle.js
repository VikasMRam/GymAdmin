import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/checkmark-circle.svg').default;

const CheckmarkCircle = forwardRef((props, ref) => <Icon ref={ref} name="checkmark-circle" svg={svg} {...props} />);

CheckmarkCircle.displayName = 'CheckmarkCircleIcon';

export default CheckmarkCircle;
