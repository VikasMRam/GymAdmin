import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/list.svg').default
// import ListSvg from './svg/list.svg';

const List = forwardRef((props, ref) => <Icon ref={ref} name="list" svg={svg} {...props} />);

List.displayName = 'ListIcon';

export default List;