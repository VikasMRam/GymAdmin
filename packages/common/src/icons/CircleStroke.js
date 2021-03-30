import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/circle-stroke.svg').default;

const CircleStroke = forwardRef((props, ref) => <Icon ref={ref} name="circle-stroke" svg={svg} {...props} />);

CircleStroke.displayName = 'CircleStrokeIcon';

export default CircleStroke;
