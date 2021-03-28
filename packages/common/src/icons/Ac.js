import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/ac.svg').default
// import AcSvg from './svg/ac.svg';

const Ac = forwardRef((props, ref) => <Icon ref={ref} name="ac" svg={svg} {...props} />);

Ac.displayName = 'AcIcon';

export default Ac;