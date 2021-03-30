import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/calendar.svg').default;

const Calendar = forwardRef((props, ref) => <Icon ref={ref} name="calendar" svg={svg} {...props} />);

Calendar.displayName = 'CalendarIcon';

export default Calendar;
