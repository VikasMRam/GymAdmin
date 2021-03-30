import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/filter.svg').default;

const Filter = forwardRef((props, ref) => <Icon ref={ref} name="filter" svg={svg} {...props} />);

Filter.displayName = 'FilterIcon';

export default Filter;
