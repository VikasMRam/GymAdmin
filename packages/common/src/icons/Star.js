import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/star.svg').default
// import StarSvg from './svg/star.svg';

const Star = forwardRef((props, ref) => <Icon ref={ref} name="star" svg={svg} {...props} />);

Star.displayName = 'StarIcon';

export default Star;