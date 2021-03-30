import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/food.svg').default;

const Food = forwardRef((props, ref) => <Icon ref={ref} name="food" svg={svg} {...props} />);

Food.displayName = 'FoodIcon';

export default Food;
