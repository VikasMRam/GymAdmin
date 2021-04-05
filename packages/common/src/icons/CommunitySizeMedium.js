import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/community-size-medium.svg').default;

const CommunitySizeMedium = forwardRef((props, ref) => <Icon ref={ref} name="community-size-medium" svg={svg} {...props} />);

CommunitySizeMedium.displayName = 'CommunitySizeMediumIcon';

export default CommunitySizeMedium;
