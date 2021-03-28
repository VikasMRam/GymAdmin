import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/luggage.svg').default
// import LuggageSvg from './svg/luggage.svg';

const Luggage = forwardRef((props, ref) => <Icon ref={ref} name="luggage" svg={svg} {...props} />);

Luggage.displayName = 'LuggageIcon';

export default Luggage;