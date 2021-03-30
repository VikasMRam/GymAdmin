import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/checkmark.svg').default;

const Checkmark = forwardRef((props, ref) => <Icon ref={ref} name="checkmark" svg={svg} {...props} />);

Checkmark.displayName = 'CheckmarkIcon';

export default Checkmark;
