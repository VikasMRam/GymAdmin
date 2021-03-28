import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/warning.svg').default
// import WarningSvg from './svg/warning.svg';

const Warning = forwardRef((props, ref) => <Icon ref={ref} name="warning" svg={svg} {...props} />);

Warning.displayName = 'WarningIcon';

export default Warning;