import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/entertainment.svg').default
// import EntertainmentSvg from './svg/entertainment.svg';

const Entertainment = forwardRef((props, ref) => <Icon ref={ref} name="entertainment" svg={svg} {...props} />);

Entertainment.displayName = 'EntertainmentIcon';

export default Entertainment;