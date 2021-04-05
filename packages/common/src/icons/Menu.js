import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/menu.svg').default;

const Menu = forwardRef((props, ref) => <Icon ref={ref} name="menu" svg={svg} {...props} />);

Menu.displayName = 'MenuIcon';

export default Menu;
