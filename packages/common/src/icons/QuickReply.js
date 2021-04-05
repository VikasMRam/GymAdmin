import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/quick-reply.svg').default;

const QuickReply = forwardRef((props, ref) => <Icon ref={ref} name="quick-reply" svg={svg} {...props} />);

QuickReply.displayName = 'QuickReplyIcon';

export default QuickReply;
