import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/fitness.svg').default;

const Fitness = forwardRef((props, ref) => <Icon ref={ref} name="fitness" svg={svg} {...props} />);

Fitness.displayName = 'FitnessIcon';

export default Fitness;
