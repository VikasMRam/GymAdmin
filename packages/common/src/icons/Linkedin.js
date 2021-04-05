import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/linkedin.svg').default;

const Linkedin = forwardRef((props, ref) => <Icon ref={ref} name="linkedin" svg={svg} {...props} />);

Linkedin.displayName = 'LinkedinIcon';

export default Linkedin;
