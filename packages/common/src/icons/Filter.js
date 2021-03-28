import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/filter.svg').default
// import FilterSvg from './svg/filter.svg';

const Filter = forwardRef((props, ref) => <Icon ref={ref} name="filter" svg={svg} {...props} />);

Filter.displayName = 'FilterIcon';

export default Filter;