import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/circle-stroke.svg').default
// import CircleStrokeSvg from './svg/circle-stroke.svg';

const CircleStroke = forwardRef((props, ref) => <Icon ref={ref} name="circle-stroke" svg={svg} {...props} />);

CircleStroke.displayName = 'CircleStrokeIcon';

export default CircleStroke;