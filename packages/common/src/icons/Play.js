import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/play.svg').default
// import PlaySvg from './svg/play.svg';

const Play = forwardRef((props, ref) => <Icon ref={ref} name="play" svg={svg} {...props} />);

Play.displayName = 'PlayIcon';

export default Play;