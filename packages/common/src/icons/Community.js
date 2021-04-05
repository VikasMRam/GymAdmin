import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/community.svg').default;

const Community = forwardRef((props, ref) => <Icon ref={ref} name="community" svg={svg} {...props} />);

Community.displayName = 'CommunityIcon';

export default Community;
