import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/close-2.svg').default;

const Close2 = forwardRef((props, ref) => <Icon ref={ref} name="close-2" svg={svg} {...props} />);

Close2.displayName = 'Close2Icon';

export default Close2;
