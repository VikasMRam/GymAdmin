import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/flash.svg').default;

const Flash = forwardRef((props, ref) => <Icon ref={ref} name="flash" svg={svg} {...props} />);

Flash.displayName = 'FlashIcon';

export default Flash;
