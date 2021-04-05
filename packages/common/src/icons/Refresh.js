import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/refresh.svg').default;

const Refresh = forwardRef((props, ref) => <Icon ref={ref} name="refresh" svg={svg} {...props} />);

Refresh.displayName = 'RefreshIcon';

export default Refresh;
