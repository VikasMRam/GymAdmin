import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/chevron-right.svg').default;

const ChevronRight = forwardRef((props, ref) => <Icon ref={ref} name="chevron-right" svg={svg} {...props} />);

ChevronRight.displayName = 'ChevronRightIcon';

export default ChevronRight;
