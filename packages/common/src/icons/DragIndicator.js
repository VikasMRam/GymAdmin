import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/drag-indicator.svg').default;

const DragIndicator = forwardRef((props, ref) => <Icon ref={ref} name="drag-indicator" svg={svg} {...props} />);

DragIndicator.displayName = 'DragIndicatorIcon';

export default DragIndicator;
