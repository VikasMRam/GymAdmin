import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/toggle.svg').default;

const Toggle = forwardRef((props, ref) => <Icon ref={ref} name="toggle" svg={svg} {...props} />);

Toggle.displayName = 'ToggleIcon';

export default Toggle;
