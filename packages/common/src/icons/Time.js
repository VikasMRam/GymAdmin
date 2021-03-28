import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/time.svg').default
// import TimeSvg from './svg/time.svg';

const Time = forwardRef((props, ref) => <Icon ref={ref} name="time" svg={svg} {...props} />);

Time.displayName = 'TimeIcon';

export default Time;