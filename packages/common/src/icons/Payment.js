import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/payment.svg').default;

const Payment = forwardRef((props, ref) => <Icon ref={ref} name="payment" svg={svg} {...props} />);

Payment.displayName = 'PaymentIcon';

export default Payment;
