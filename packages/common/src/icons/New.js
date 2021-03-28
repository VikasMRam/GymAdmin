import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/new.svg').default
// import NewSvg from './svg/new.svg';

const New = forwardRef((props, ref) => <Icon ref={ref} name="new" svg={svg} {...props} />);

New.displayName = 'NewIcon';

export default New;