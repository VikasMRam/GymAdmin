import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/bed.svg').default;

const Bed = forwardRef((props, ref) => <Icon ref={ref} name="bed" svg={svg} {...props} />);

Bed.displayName = 'BedIcon';

export default Bed;
