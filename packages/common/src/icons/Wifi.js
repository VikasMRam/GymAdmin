import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/wifi.svg').default
// import WifiSvg from './svg/wifi.svg';

const Wifi = forwardRef((props, ref) => <Icon ref={ref} name="wifi" svg={svg} {...props} />);

Wifi.displayName = 'WifiIcon';

export default Wifi;