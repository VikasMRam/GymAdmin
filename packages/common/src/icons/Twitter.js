import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/twitter.svg').default
// import TwitterSvg from './svg/twitter.svg';

const Twitter = forwardRef((props, ref) => <Icon ref={ref} name="twitter" svg={svg} {...props} />);

Twitter.displayName = 'TwitterIcon';

export default Twitter;