import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/verified.svg').default
// import VerifiedSvg from './svg/verified.svg';

const Verified = forwardRef((props, ref) => <Icon ref={ref} name="verified" svg={svg} {...props} />);

Verified.displayName = 'VerifiedIcon';

export default Verified;