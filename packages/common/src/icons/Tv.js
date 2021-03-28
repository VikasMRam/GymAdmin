import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/tv.svg').default
// import TvSvg from './svg/tv.svg';

const Tv = forwardRef((props, ref) => <Icon ref={ref} name="tv" svg={svg} {...props} />);

Tv.displayName = 'TvIcon';

export default Tv;