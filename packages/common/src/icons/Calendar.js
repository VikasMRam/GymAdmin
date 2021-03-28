import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/calendar.svg').default
// import CalendarSvg from './svg/calendar.svg';

const Calendar = forwardRef((props, ref) => <Icon ref={ref} name="calendar" svg={svg} {...props} />);

Calendar.displayName = 'CalendarIcon';

export default Calendar;