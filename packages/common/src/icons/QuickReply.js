import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/quick-reply.svg').default
// import QuickReplySvg from './svg/quick-reply.svg';

const QuickReply = forwardRef((props, ref) => <Icon ref={ref} name="quick-reply" svg={svg} {...props} />);

QuickReply.displayName = 'QuickReplyIcon';

export default QuickReply;