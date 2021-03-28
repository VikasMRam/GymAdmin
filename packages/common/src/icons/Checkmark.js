import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/checkmark.svg').default
// import CheckmarkSvg from './svg/checkmark.svg';

const Checkmark = forwardRef((props, ref) => <Icon ref={ref} name="checkmark" svg={svg} {...props} />);

Checkmark.displayName = 'CheckmarkIcon';

export default Checkmark;