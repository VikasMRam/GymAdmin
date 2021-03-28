import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/toggle.svg').default
// import ToggleSvg from './svg/toggle.svg';

const Toggle = forwardRef((props, ref) => <Icon ref={ref} name="toggle" svg={svg} {...props} />);

Toggle.displayName = 'ToggleIcon';

export default Toggle;