import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/money.svg').default;

const Money = forwardRef((props, ref) => <Icon ref={ref} name="money" svg={svg} {...props} />);

Money.displayName = 'MoneyIcon';

export default Money;
