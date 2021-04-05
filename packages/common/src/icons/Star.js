import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/star.svg').default;

const Star = forwardRef((props, ref) => <Icon ref={ref} name="star" svg={svg} {...props} />);

Star.displayName = 'StarIcon';

export default Star;
