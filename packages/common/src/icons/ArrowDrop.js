import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/arrow-drop.svg').default;

const ArrowDrop = forwardRef((props, ref) => <Icon ref={ref} name="arrow-drop" svg={svg} {...props} />);

ArrowDrop.displayName = 'ArrowDropIcon';

export default ArrowDrop;
