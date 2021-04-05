import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/share.svg').default;

const Share = forwardRef((props, ref) => <Icon ref={ref} name="share" svg={svg} {...props} />);

Share.displayName = 'ShareIcon';

export default Share;
