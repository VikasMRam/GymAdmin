import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/tv-2.svg').default;

const Tv2 = forwardRef((props, ref) => <Icon ref={ref} name="tv-2" svg={svg} {...props} />);

Tv2.displayName = 'Tv2Icon';

export default Tv2;
