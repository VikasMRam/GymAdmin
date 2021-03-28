import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/location.svg').default
// import LocationSvg from './svg/location.svg';

const Location = forwardRef((props, ref) => <Icon ref={ref} name="location" svg={svg} {...props} />);

Location.displayName = 'LocationIcon';

export default Location;