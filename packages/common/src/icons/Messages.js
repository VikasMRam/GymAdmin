import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/messages.svg').default;

const Messages = forwardRef((props, ref) => <Icon ref={ref} name="messages" svg={svg} {...props} />);

Messages.displayName = 'MessagesIcon';

export default Messages;
