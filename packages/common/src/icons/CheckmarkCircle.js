import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/checkmark-circle.svg').default
// import CheckmarkCircleSvg from './svg/checkmark-circle.svg';

const CheckmarkCircle = forwardRef((props, ref) => <Icon ref={ref} name="checkmark-circle" svg={svg} {...props} />);

CheckmarkCircle.displayName = 'CheckmarkCircleIcon';

export default CheckmarkCircle;