import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/light.svg').default
// import LightSvg from './svg/light.svg';

const Light = forwardRef((props, ref) => <Icon ref={ref} name="light" svg={svg} {...props} />);

Light.displayName = 'LightIcon';

export default Light;