import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/beds.svg').default;

const Beds = forwardRef((props, ref) => <Icon ref={ref} name="beds" svg={svg} {...props} />);

Beds.displayName = 'BedsIcon';

export default Beds;
