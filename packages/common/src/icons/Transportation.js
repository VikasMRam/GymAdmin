import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/transportation.svg').default;

const Transportation = forwardRef((props, ref) => <Icon ref={ref} name="transportation" svg={svg} {...props} />);

Transportation.displayName = 'TransportationIcon';

export default Transportation;
