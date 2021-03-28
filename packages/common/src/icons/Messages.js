import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/messages.svg').default
// import MessagesSvg from './svg/messages.svg';

const Messages = forwardRef((props, ref) => <Icon ref={ref} name="messages" svg={svg} {...props} />);

Messages.displayName = 'MessagesIcon';

export default Messages;