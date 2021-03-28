import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/chevron.svg').default
// import ChevronSvg from './svg/chevron.svg';

const Chevron = forwardRef((props, ref) => <Icon ref={ref} name="chevron" svg={svg} {...props} />);

Chevron.displayName = 'ChevronIcon';

export default Chevron;