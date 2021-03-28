import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/garage.svg').default
// import GarageSvg from './svg/garage.svg';

const Garage = forwardRef((props, ref) => <Icon ref={ref} name="garage" svg={svg} {...props} />);

Garage.displayName = 'GarageIcon';

export default Garage;