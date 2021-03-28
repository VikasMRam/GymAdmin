import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/transportation.svg').default
// import TransportationSvg from './svg/transportation.svg';

const Transportation = forwardRef((props, ref) => <Icon ref={ref} name="transportation" svg={svg} {...props} />);

Transportation.displayName = 'TransportationIcon';

export default Transportation;