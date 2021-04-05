import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/time.svg').default;

const Time = forwardRef((props, ref) => <Icon ref={ref} name="time" svg={svg} {...props} />);

Time.displayName = 'TimeIcon';

export default Time;
