import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/delete.svg').default
// import DeleteSvg from './svg/delete.svg';

const Delete = forwardRef((props, ref) => <Icon ref={ref} name="delete" svg={svg} {...props} />);

Delete.displayName = 'DeleteIcon';

export default Delete;