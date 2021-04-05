import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/list.svg').default;

const List = forwardRef((props, ref) => <Icon ref={ref} name="list" svg={svg} {...props} />);

List.displayName = 'ListIcon';

export default List;
