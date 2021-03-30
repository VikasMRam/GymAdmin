import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/ac.svg').default;

const Ac = forwardRef((props, ref) => <Icon ref={ref} name="ac" svg={svg} {...props} />);

Ac.displayName = 'AcIcon';

export default Ac;
