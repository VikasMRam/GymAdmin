import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/view.svg').default;

const View = forwardRef((props, ref) => <Icon ref={ref} name="view" svg={svg} {...props} />);

View.displayName = 'ViewIcon';

export default View;
