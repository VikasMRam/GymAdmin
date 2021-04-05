import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/plus.svg').default;

const Plus = forwardRef((props, ref) => <Icon ref={ref} name="plus" svg={svg} {...props} />);

Plus.displayName = 'PlusIcon';

export default Plus;
