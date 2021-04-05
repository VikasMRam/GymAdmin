import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/verified.svg').default;

const Verified = forwardRef((props, ref) => <Icon ref={ref} name="verified" svg={svg} {...props} />);

Verified.displayName = 'VerifiedIcon';

export default Verified;
