import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/user.svg').default;

const User = forwardRef((props, ref) => <Icon ref={ref} name="user" svg={svg} {...props} />);

User.displayName = 'UserIcon';

export default User;
