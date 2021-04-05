import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/shopping.svg').default;

const Shopping = forwardRef((props, ref) => <Icon ref={ref} name="shopping" svg={svg} {...props} />);

Shopping.displayName = 'ShoppingIcon';

export default Shopping;
