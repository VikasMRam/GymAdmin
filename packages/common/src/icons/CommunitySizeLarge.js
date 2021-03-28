import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/community-size-large.svg').default
// import CommunitySizeLargeSvg from './svg/community-size-large.svg';

const CommunitySizeLarge = forwardRef((props, ref) => <Icon ref={ref} name="community-size-large" svg={svg} {...props} />);

CommunitySizeLarge.displayName = 'CommunitySizeLargeIcon';

export default CommunitySizeLarge;