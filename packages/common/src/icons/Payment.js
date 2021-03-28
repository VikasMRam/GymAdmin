import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/payment.svg').default
// import PaymentSvg from './svg/payment.svg';

const Payment = forwardRef((props, ref) => <Icon ref={ref} name="payment" svg={svg} {...props} />);

Payment.displayName = 'PaymentIcon';

export default Payment;