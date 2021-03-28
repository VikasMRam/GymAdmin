import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/share.svg').default
// import ShareSvg from './svg/share.svg';

const Share = forwardRef((props, ref) => <Icon ref={ref} name="share" svg={svg} {...props} />);

Share.displayName = 'ShareIcon';

export default Share;