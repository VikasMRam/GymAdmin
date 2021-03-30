import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/outdoor.svg').default;

const Outdoor = forwardRef((props, ref) => <Icon ref={ref} name="outdoor" svg={svg} {...props} />);

Outdoor.displayName = 'OutdoorIcon';

export default Outdoor;
