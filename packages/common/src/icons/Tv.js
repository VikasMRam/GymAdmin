import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/tv.svg').default;

const Tv = forwardRef((props, ref) => <Icon ref={ref} name="tv" svg={svg} {...props} />);

Tv.displayName = 'TvIcon';

export default Tv;
