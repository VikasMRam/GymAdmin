import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/close.svg').default;

const Close = forwardRef((props, ref) => <Icon ref={ref} name="close" svg={svg} {...props} />);

Close.displayName = 'CloseIcon';

export default Close;
