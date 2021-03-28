import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/room-service.svg').default
// import RoomServiceSvg from './svg/room-service.svg';

const RoomService = forwardRef((props, ref) => <Icon ref={ref} name="room-service" svg={svg} {...props} />);

RoomService.displayName = 'RoomServiceIcon';

export default RoomService;