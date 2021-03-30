import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/twitter.svg').default;

const Twitter = forwardRef((props, ref) => <Icon ref={ref} name="twitter" svg={svg} {...props} />);

Twitter.displayName = 'TwitterIcon';

export default Twitter;
