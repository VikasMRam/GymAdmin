import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/checkbox.svg').default;

const Checkbox = forwardRef((props, ref) => <Icon ref={ref} name="checkbox" svg={svg} {...props} />);

Checkbox.displayName = 'CheckboxIcon';

export default Checkbox;
