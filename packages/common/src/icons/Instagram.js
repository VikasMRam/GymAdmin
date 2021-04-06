import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/instagram.svg').default;

const Instagram = forwardRef((props, ref) => <Icon ref={ref} name="instagram" svg={svg} {...props} />);

Instagram.displayName = 'InstagramIcon';

export default Instagram;
