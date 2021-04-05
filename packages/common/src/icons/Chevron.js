import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/chevron.svg').default;

const Chevron = forwardRef((props, ref) => <Icon ref={ref} name="chevron" svg={svg} {...props} />);

Chevron.displayName = 'ChevronIcon';

export default Chevron;
