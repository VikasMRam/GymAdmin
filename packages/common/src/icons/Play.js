import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/play.svg').default;

const Play = forwardRef((props, ref) => <Icon ref={ref} name="play" svg={svg} {...props} />);

Play.displayName = 'PlayIcon';

export default Play;
