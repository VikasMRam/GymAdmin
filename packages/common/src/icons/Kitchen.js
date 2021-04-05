import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/kitchen.svg').default;

const Kitchen = forwardRef((props, ref) => <Icon ref={ref} name="kitchen" svg={svg} {...props} />);

Kitchen.displayName = 'KitchenIcon';

export default Kitchen;
