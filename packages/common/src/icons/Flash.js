import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/flash.svg').default
// import FlashSvg from './svg/flash.svg';

const Flash = forwardRef((props, ref) => <Icon ref={ref} name="flash" svg={svg} {...props} />);

Flash.displayName = 'FlashIcon';

export default Flash;