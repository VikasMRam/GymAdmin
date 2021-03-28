import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/chevron-right.svg').default
// import ChevronRightSvg from './svg/chevron-right.svg';

const ChevronRight = forwardRef((props, ref) => <Icon ref={ref} name="chevron-right" svg={svg} {...props} />);

ChevronRight.displayName = 'ChevronRightIcon';

export default ChevronRight;