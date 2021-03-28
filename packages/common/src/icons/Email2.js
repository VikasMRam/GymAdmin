import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/email-2.svg').default
// import Email2Svg from './svg/email-2.svg';

const Email2 = forwardRef((props, ref) => <Icon ref={ref} name="email-2" svg={svg} {...props} />);

Email2.displayName = 'Email2Icon';

export default Email2;