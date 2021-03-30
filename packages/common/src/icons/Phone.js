import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/phone.svg').default;

const Phone = forwardRef((props, ref) => <Icon ref={ref} name="phone" svg={svg} {...props} />);

Phone.displayName = 'PhoneIcon';

export default Phone;
