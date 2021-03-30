import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/wifi.svg').default;

const Wifi = forwardRef((props, ref) => <Icon ref={ref} name="wifi" svg={svg} {...props} />);

Wifi.displayName = 'WifiIcon';

export default Wifi;
