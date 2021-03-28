import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/community-size-medium.svg').default
// import CommunitySizeMediumSvg from './svg/community-size-medium.svg';

const CommunitySizeMedium = forwardRef((props, ref) => <Icon ref={ref} name="community-size-medium" svg={svg} {...props} />);

CommunitySizeMedium.displayName = 'CommunitySizeMediumIcon';

export default CommunitySizeMedium;