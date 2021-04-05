import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/community-size-small.svg').default;

const CommunitySizeSmall = forwardRef((props, ref) => <Icon ref={ref} name="community-size-small" svg={svg} {...props} />);

CommunitySizeSmall.displayName = 'CommunitySizeSmallIcon';

export default CommunitySizeSmall;
