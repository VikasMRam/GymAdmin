import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/kitchen.svg').default
// import KitchenSvg from './svg/kitchen.svg';

const Kitchen = forwardRef((props, ref) => <Icon ref={ref} name="kitchen" svg={svg} {...props} />);

Kitchen.displayName = 'KitchenIcon';

export default Kitchen;