import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/spa.svg').default
// import SpaSvg from './svg/spa.svg';

const Spa = forwardRef((props, ref) => <Icon ref={ref} name="spa" svg={svg} {...props} />);

Spa.displayName = 'SpaIcon';

export default Spa;