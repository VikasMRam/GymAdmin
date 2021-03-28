import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/email.svg').default
// import EmailSvg from './svg/email.svg';

const Email = forwardRef((props, ref) => <Icon ref={ref} name="email" svg={svg} {...props} />);

Email.displayName = 'EmailIcon';

export default Email;