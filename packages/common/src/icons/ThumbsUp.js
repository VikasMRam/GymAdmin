import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/thumbs-up.svg').default;

const ThumbsUp = forwardRef((props, ref) => <Icon ref={ref} name="thumbs-up" svg={svg} {...props} />);

ThumbsUp.displayName = 'ThumbsUpIcon';

export default ThumbsUp;
