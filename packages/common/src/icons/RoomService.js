import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/room-service.svg').default;

const RoomService = forwardRef((props, ref) => <Icon ref={ref} name="room-service" svg={svg} {...props} />);

RoomService.displayName = 'RoomServiceIcon';

export default RoomService;
