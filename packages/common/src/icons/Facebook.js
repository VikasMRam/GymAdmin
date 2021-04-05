import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/facebook.svg').default;

const Facebook = forwardRef((props, ref) => <Icon ref={ref} name="facebook" svg={svg} {...props} />);

Facebook.displayName = 'FacebookIcon';

export default Facebook;
