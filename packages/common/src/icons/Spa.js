import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/spa.svg').default;

const Spa = forwardRef((props, ref) => <Icon ref={ref} name="spa" svg={svg} {...props} />);

Spa.displayName = 'SpaIcon';

export default Spa;
