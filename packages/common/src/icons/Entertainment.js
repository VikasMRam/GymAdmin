import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/entertainment.svg').default;

const Entertainment = forwardRef((props, ref) => <Icon ref={ref} name="entertainment" svg={svg} {...props} />);

Entertainment.displayName = 'EntertainmentIcon';

export default Entertainment;
