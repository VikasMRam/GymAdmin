import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/money.svg').default
// import MoneySvg from './svg/money.svg';

const Money = forwardRef((props, ref) => <Icon ref={ref} name="money" svg={svg} {...props} />);

Money.displayName = 'MoneyIcon';

export default Money;