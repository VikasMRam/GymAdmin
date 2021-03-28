import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/drag-indicator.svg').default
// import DragIndicatorSvg from './svg/drag-indicator.svg';

const DragIndicator = forwardRef((props, ref) => <Icon ref={ref} name="drag-indicator" svg={svg} {...props} />);

DragIndicator.displayName = 'DragIndicatorIcon';

export default DragIndicator;