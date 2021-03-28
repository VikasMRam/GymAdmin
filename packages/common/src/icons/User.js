import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/user.svg').default
// import UserSvg from './svg/user.svg';

const User = forwardRef((props, ref) => <Icon ref={ref} name="user" svg={svg} {...props} />);

User.displayName = 'UserIcon';

export default User;