import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/light.svg').default;

const Light = forwardRef((props, ref) => <Icon ref={ref} name="light" svg={svg} {...props} />);

Light.displayName = 'LightIcon';

export default Light;
