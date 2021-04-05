import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/flower.svg').default;

const Flower = forwardRef((props, ref) => <Icon ref={ref} name="flower" svg={svg} {...props} />);

Flower.displayName = 'FlowerIcon';

export default Flower;
