import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/pause.svg').default
// import PauseSvg from './svg/pause.svg';

const Pause = forwardRef((props, ref) => <Icon ref={ref} name="pause" svg={svg} {...props} />);

Pause.displayName = 'PauseIcon';

export default Pause;