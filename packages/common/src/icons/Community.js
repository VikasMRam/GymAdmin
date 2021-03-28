import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/community.svg').default
// import CommunitySvg from './svg/community.svg';

const Community = forwardRef((props, ref) => <Icon ref={ref} name="community" svg={svg} {...props} />);

Community.displayName = 'CommunityIcon';

export default Community;