import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/warning.svg').default;

const Warning = forwardRef((props, ref) => <Icon ref={ref} name="warning" svg={svg} {...props} />);

Warning.displayName = 'WarningIcon';

export default Warning;