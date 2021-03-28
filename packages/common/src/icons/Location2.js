import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/location-2.svg').default
// import Location2Svg from './svg/location-2.svg';

const Location2 = forwardRef((props, ref) => <Icon ref={ref} name="location-2" svg={svg} {...props} />);

Location2.displayName = 'Location2Icon';

export default Location2;