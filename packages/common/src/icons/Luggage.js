import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/luggage.svg').default;

const Luggage = forwardRef((props, ref) => <Icon ref={ref} name="luggage" svg={svg} {...props} />);

Luggage.displayName = 'LuggageIcon';

export default Luggage;
