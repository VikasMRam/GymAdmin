import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/help.svg').default;

const Help = forwardRef((props, ref) => <Icon ref={ref} name="help" svg={svg} {...props} />);

Help.displayName = 'HelpIcon';

export default Help;
