import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/shopping.svg').default
// import ShoppingSvg from './svg/shopping.svg';

const Shopping = forwardRef((props, ref) => <Icon ref={ref} name="shopping" svg={svg} {...props} />);

Shopping.displayName = 'ShoppingIcon';

export default Shopping;