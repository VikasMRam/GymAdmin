import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/phone.svg').default
// import PhoneSvg from './svg/phone.svg';

const Phone = forwardRef((props, ref) => <Icon ref={ref} name="phone" svg={svg} {...props} />);

Phone.displayName = 'PhoneIcon';

export default Phone;