import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/new.svg').default;

const New = forwardRef((props, ref) => <Icon ref={ref} name="new" svg={svg} {...props} />);

New.displayName = 'NewIcon';

export default New;
