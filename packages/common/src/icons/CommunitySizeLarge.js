import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/community-size-large.svg').default;

const CommunitySizeLarge = forwardRef((props, ref) => <Icon ref={ref} name="community-size-large" svg={svg} {...props} />);

CommunitySizeLarge.displayName = 'CommunitySizeLargeIcon';

export default CommunitySizeLarge;
