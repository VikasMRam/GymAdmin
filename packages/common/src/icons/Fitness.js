import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/fitness.svg').default
// import FitnessSvg from './svg/fitness.svg';

const Fitness = forwardRef((props, ref) => <Icon ref={ref} name="fitness" svg={svg} {...props} />);

Fitness.displayName = 'FitnessIcon';

export default Fitness;