import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/beds.svg').default
// import BedsSvg from './svg/beds.svg';

const Beds = forwardRef((props, ref) => <Icon ref={ref} name="beds" svg={svg} {...props} />);

Beds.displayName = 'BedsIcon';

export default Beds;