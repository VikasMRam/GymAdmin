import React, { forwardRef } from 'react';
import Helmet from 'react-helmet';
import ReactDatePicker from 'react-datepicker';

import DatepickerStyles from 'sly/web/components/themes/DatepickerStyles';

const DatePicker = forwardRef((props, ref) => (
  <>
    <Helmet>
      <style type="text/css">{DatepickerStyles}</style>
    </Helmet>
    <ReactDatePicker ref={ref} {...props} />
  </>
));

export default DatePicker;
