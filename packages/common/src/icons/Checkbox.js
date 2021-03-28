import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/checkbox.svg').default
// import CheckboxSvg from './svg/checkbox.svg';

const Checkbox = forwardRef((props, ref) => <Icon ref={ref} name="checkbox" svg={svg} {...props} />);

Checkbox.displayName = 'CheckboxIcon';

export default Checkbox;