import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/location.svg').default;

const Location = forwardRef((props, ref) => <Icon ref={ref} name="location" svg={svg} {...props} />);

Location.displayName = 'LocationIcon';

export default Location;
