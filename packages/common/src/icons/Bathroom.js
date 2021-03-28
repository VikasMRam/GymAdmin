import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/bathroom.svg').default
// import BathroomSvg from './svg/bathroom.svg';

const Bathroom = forwardRef((props, ref) => <Icon ref={ref} name="bathroom" svg={svg} {...props} />);

Bathroom.displayName = 'BathroomIcon';

export default Bathroom;