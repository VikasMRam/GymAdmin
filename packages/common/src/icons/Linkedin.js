import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/linkedin.svg').default
// import LinkedinSvg from './svg/linkedin.svg';

const Linkedin = forwardRef((props, ref) => <Icon ref={ref} name="linkedin" svg={svg} {...props} />);

Linkedin.displayName = 'LinkedinIcon';

export default Linkedin;