import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/accessible.svg').default
// import AccessibleSvg from './svg/accessible.svg';

const Accessible = forwardRef((props, ref) => <Icon ref={ref} name="accessible" svg={svg} {...props} />);

Accessible.displayName = 'AccessibleIcon';

export default Accessible;