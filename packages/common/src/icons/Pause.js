import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/pause.svg').default;

const Pause = forwardRef((props, ref) => <Icon ref={ref} name="pause" svg={svg} {...props} />);

Pause.displayName = 'PauseIcon';

export default Pause;
