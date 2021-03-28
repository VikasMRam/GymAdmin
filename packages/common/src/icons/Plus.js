import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/plus.svg').default
// import PlusSvg from './svg/plus.svg';

const Plus = forwardRef((props, ref) => <Icon ref={ref} name="plus" svg={svg} {...props} />);

Plus.displayName = 'PlusIcon';

export default Plus;