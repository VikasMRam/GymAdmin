import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/bed.svg').default
// import BedSvg from './svg/bed.svg';

const Bed = forwardRef((props, ref) => <Icon ref={ref} name="bed" svg={svg} {...props} />);

Bed.displayName = 'BedIcon';

export default Bed;