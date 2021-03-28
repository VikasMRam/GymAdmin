import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/facebook.svg').default
// import FacebookSvg from './svg/facebook.svg';

const Facebook = forwardRef((props, ref) => <Icon ref={ref} name="facebook" svg={svg} {...props} />);

Facebook.displayName = 'FacebookIcon';

export default Facebook;