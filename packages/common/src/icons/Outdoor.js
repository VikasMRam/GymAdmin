import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/outdoor.svg').default
// import OutdoorSvg from './svg/outdoor.svg';

const Outdoor = forwardRef((props, ref) => <Icon ref={ref} name="outdoor" svg={svg} {...props} />);

Outdoor.displayName = 'OutdoorIcon';

export default Outdoor;