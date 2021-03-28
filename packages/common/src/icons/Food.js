import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/food.svg').default
// import FoodSvg from './svg/food.svg';

const Food = forwardRef((props, ref) => <Icon ref={ref} name="food" svg={svg} {...props} />);

Food.displayName = 'FoodIcon';

export default Food;