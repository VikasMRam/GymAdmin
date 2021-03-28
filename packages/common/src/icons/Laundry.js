import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/laundry.svg').default
// import LaundrySvg from './svg/laundry.svg';

const Laundry = forwardRef((props, ref) => <Icon ref={ref} name="laundry" svg={svg} {...props} />);

Laundry.displayName = 'LaundryIcon';

export default Laundry;