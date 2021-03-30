import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/delete.svg').default;

const Delete = forwardRef((props, ref) => <Icon ref={ref} name="delete" svg={svg} {...props} />);

Delete.displayName = 'DeleteIcon';

export default Delete;
