import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/refresh.svg').default
// import RefreshSvg from './svg/refresh.svg';

const Refresh = forwardRef((props, ref) => <Icon ref={ref} name="refresh" svg={svg} {...props} />);

Refresh.displayName = 'RefreshIcon';

export default Refresh;