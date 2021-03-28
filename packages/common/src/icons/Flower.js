import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/flower.svg').default
// import FlowerSvg from './svg/flower.svg';

const Flower = forwardRef((props, ref) => <Icon ref={ref} name="flower" svg={svg} {...props} />);

Flower.displayName = 'FlowerIcon';

export default Flower;